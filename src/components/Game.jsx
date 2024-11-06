import React, { useState, useCallback, useRef } from "react";
import { produce } from "immer";
import Instructions from "./Instructions";
import Menu from "./Menu";

const numRows = Math.floor(40 * 1.5);
const numCols = Math.floor(70 * 1.5);
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

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const Game = () => {
  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

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
    }
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
    setGrid(generateEmptyGrid());
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

  return (
    <div className="flex flex-col items-center p-4 ">
      <Menu
        toggleRunning={toggleRunning}
        running={running}
        randomizeGrid={randomizeGrid}
        clear={clear}
        toggleMenu={toggleMenu}
        showMenu={showMenu}
        applyPattern={applyPattern}
      />
      <div className="flex flex-wrap justify-center space-x-2">
        <button
          onClick={toggleInstructions}
          className="px-6 py-2  bg-white text-black rounded-md shadow-md hover:bg-green-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-0 focus:ring-green-400"
        >
          Instructions
        </button>
        <button
          onClick={toggleRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={randomizeGrid}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
        >
          Randomize
        </button>
        <button
          onClick={clear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
        >
          Clear
        </button>
      </div>
      <div
        className="grid border border-white mt-2"
        style={{ gridTemplateColumns: `repeat(${numCols}, 12px)` }}
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
              }}
              className={`w-3 h-3 border cursor-pointer border-zinc-900 border- ${
                grid[i][j] ? "bg-zinc-300" : ""
              }`}
            />
          ))
        )}
      </div>
      {showInstructions && <Instructions onClose={toggleInstructions} />}
    </div>
  );
};

export default Game;
