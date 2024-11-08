import React, { useState, useCallback, useRef, useEffect } from "react";
import { produce } from "immer";
import Instructions from "./Instructions";
import Menu from "./Menu";
import RetroButton from "./RetroButton";
import { sounds } from "../constants";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateEmptyGrid = (numRows, numCols) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const Game = () => {
  const [numRows, setNumRows] = useState(60);
  const [numCols, setNumCols] = useState(100);
  const [grid, setGrid] = useState(() => generateEmptyGrid(numRows, numCols));
  const [running, setRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [aliveColor, setAliveColor] = useState("#d4d4d8");
  const [deadColor, setDeadColor] = useState("#000000");

  const toggleInstructions = () => setShowInstructions((prev) => !prev);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
  }, []);

  const toggleRunning = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
      sounds.background.play();
    } else {
      sounds.background.stop();
    }
  };

  const handleCellToggle = () => {
    sounds.cellToggle.play();
  };

  const randomizeGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
    setGrid(rows);
  };

  const clear = () => {
    setGrid(generateEmptyGrid(numRows, numCols));
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const applyPattern = (pattern) => {
    const centerX = Math.floor(numRows / 2);
    const centerY = Math.floor(numCols / 2);

    setGrid((g) =>
      produce(g, (gridCopy) => {
        pattern.forEach(([x, y]) => {
          const shiftedX = centerX - Math.floor(pattern.length / 2) + x;
          const shiftedY = centerY - Math.floor(pattern[0].length / 2) + y;
          if (
            shiftedX >= 0 &&
            shiftedX < numRows &&
            shiftedY >= 0 &&
            shiftedY < numCols
          ) {
            gridCopy[shiftedX][shiftedY] = 1;
          }
        });
      })
    );
  };

  useEffect(() => {
    return () => {
      sounds.background.stop();
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col md:flex-row w-full px-4 md:px-6 justify-between items-center border-b border-white p-2">
        <h1 className="text-base md:text-lg lg:text-xl tracking-wider text-[#68d391] mb-2 md:mb-0">
          Conway's Game of Life
        </h1>
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 space-y-2 md:space-y-0">
          <RetroButton onpress={toggleInstructions} label={"Instructions"} />
          <RetroButton
            onpress={toggleRunning}
            label={running ? "Stop" : "Start"}
          />
          <RetroButton onpress={randomizeGrid} label={"Randomize"} />
          <RetroButton onpress={clear} label={"Clear"} />
        </div>
        <Menu
          toggleMenu={toggleMenu}
          showMenu={showMenu}
          applyPattern={applyPattern}
          aliveColor={aliveColor}
          setAliveColor={setAliveColor}
          deadColor={deadColor}
          setDeadColor={setDeadColor}
          setNumRows={setNumRows}
          setNumCols={setNumCols}
          numRows={numRows}
          numCols={numCols}
        />
      </div>

      <div
        className="grid border border-white mt-2 self-center"
        style={{ gridTemplateColumns: `repeat(${numCols}, 10px)` }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
                handleCellToggle();
              }}
              className="w-2.5 h-2.5 border cursor-pointer border-zinc-900"
              style={{
                backgroundColor: grid[i][j] ? aliveColor : deadColor,
              }}
            />
          ))
        )}
      </div>
      {showInstructions && <Instructions onClose={toggleInstructions} />}
    </div>
  );
};

export default Game;
