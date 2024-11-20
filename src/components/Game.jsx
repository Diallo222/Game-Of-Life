import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { produce } from "immer";
import Instructions from "./Instructions";
import Menu from "./Menu";
import RetroButton from "./RetroButton";
import { sounds } from "../constants";
import Controls from "./Controls";

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

  // Memoize expensive computations
  const memoizedGrid = useMemo(() => grid, [grid]);
  const memoizedOperations = useMemo(() => operations, []);

  const toggleInstructions = () => setShowInstructions((prev) => !prev);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        const buffer = Array(numRows).fill().map(() => Array(numCols).fill(0));

        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            if (i > 0 && j > 0) neighbors += g[i - 1][j - 1];
            if (i > 0) neighbors += g[i - 1][j];
            if (i > 0 && j < numCols - 1) neighbors += g[i - 1][j + 1];
            if (j > 0) neighbors += g[i][j - 1];
            if (j < numCols - 1) neighbors += g[i][j + 1];
            if (i < numRows - 1 && j > 0) neighbors += g[i + 1][j - 1];
            if (i < numRows - 1) neighbors += g[i + 1][j];
            if (i < numRows - 1 && j < numCols - 1) neighbors += g[i + 1][j + 1];

            buffer[i][j] = neighbors === 3 || (neighbors === 2 && g[i][j]);
          }
        }

        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            gridCopy[i][j] = buffer[i][j];
          }
        }
      });
    });

    requestAnimationFrame(runSimulation);
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
        <Controls toggleInstructions={toggleInstructions} running={running} onToggle={toggleRunning} onClear={clear} onRandomize={randomizeGrid} />
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
        {memoizedGrid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(memoizedGrid, (gridCopy) => {
                  gridCopy[i][j] = memoizedGrid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
                handleCellToggle();
              }}
              className="w-2.5 h-2.5 border cursor-pointer border-zinc-900"
              style={{
                backgroundColor: memoizedGrid[i][j] ? aliveColor : deadColor,
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
