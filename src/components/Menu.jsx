import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { patterns, sounds } from "../constants";
import ColorPicker from "./ColorPicker";

const cellSize = 6;

const renderPatternPreview = (pattern, aliveColor, deadColor) => {
  const grid = Array.from({ length: 6 }, () => Array(6).fill(0));
  pattern.forEach(([x, y]) => {
    if (x < 6 && y < 6) {
      grid[x][y] = 1;
    }
  });

  return (
    <div className="grid grid-cols-6 gap-0.5">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: cell === 1 ? aliveColor : deadColor,
            }}
          />
        ))
      )}
    </div>
  );
};

const Menu = ({
  showMenu,
  toggleMenu,
  applyPattern,
  aliveColor,
  setAliveColor,
  deadColor,
  setDeadColor,
  setNumRows,
  setNumCols,
  numRows,
  numCols,
}) => {
  return (
    <motion.div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-base text-center text-[#68d391]">Config</p>
        <button
          onClick={toggleMenu}
          className="bg-[#68d391] text-black flex items-center justify-center p-2 rounded-full"
        >
          {showMenu ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>

      <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ y: 100 }}
      className={`absolute top-16 right-4 z-10 w-80 bg-zinc-800 p-4 rounded-xl space-y-4 shadow-lg ${
        showMenu ? "block" : "hidden"
      }`}
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
      }}
      >
        {/* Cell Size Control */}
        {/* <div>
          <p className="text-base text-white mb-1">Grid Size</p>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label htmlFor="numRows" className="text-xs text-gray-300">
                Rows
              </label>
              <input
                type="number"
                id="numRows"
                value={numRows}
                onChange={(e) => setNumRows(e.target.value)}
                className="w-16 p-1 bg-zinc-700 rounded-lg text-center"
                min="1"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="numCols" className="text-xs text-gray-300">
                Columns
              </label>
              <input
                type="number"
                id="numCols"
                value={numCols}
                onChange={(e) => setNumCols(e.target.value)}
                className="w-16 p-1 bg-zinc-700 rounded-lg text-center"
                min="1"
              />
            </div>
          </div>
        </div> */}

        {/* Color Selection */}
        <div>
          <p className="text-base text-white mb-1">Cell Colors</p>
          <div className="flex items-center justify-between">
            <ColorPicker
              label="Alive"
              color={aliveColor}
              onChange={setAliveColor}
            />
            <ColorPicker
              label="Dead"
              color={deadColor}
              onChange={setDeadColor}
            />
          </div>
        </div>

        {/* Pattern Selection */}
        <div>
          <p className="text-base text-white mb-1">Pattern Presets</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(patterns).map((pattern) => (
              <button
                key={pattern}
                onClick={() => {
                  applyPattern(patterns[pattern]);
                  sounds.cellToggle.play();
                }}
                className="bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-2">
                    {renderPatternPreview(
                      patterns[pattern],
                      aliveColor,
                      deadColor
                    )}
                  </div>
                  <p className="text-xs text-clip overflow-hidden ... ">
                    {pattern}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Menu;
