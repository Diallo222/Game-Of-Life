import React, { useState, useCallback, useRef } from "react";
import { produce } from "immer";

const numRows = Math.floor(22 * 1.5);
const numCols = Math.floor(40 * 1.5);
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

  return (
    <div className="flex flex-col items-center p-4 space-y-4 ">
      <div className="space-x-4">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
        >
          Randomize
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400"
        >
          Clear
        </button>
      </div>
      <div
        className="grid border border-white"
        style={{ gridTemplateColumns: `repeat(${numCols}, 14px)` }}
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
              className={`w-3.5 h-3.5 border border-white ${
                grid[i][j] ? "bg-white" : ""
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Game;
