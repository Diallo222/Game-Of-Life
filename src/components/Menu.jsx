import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { patterns } from "../constants";
import ColorPicker from "./ColorPicker";

const cellSize = 6;

const renderPatternPreview = (pattern, aliveColor, deadColor) => {
  const grid = Array.from({ length: 6 }, () => Array(6).fill(0));

  // Fill the grid based on the pattern
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
}) => {
  return (
    <motion.div>
      <div className="flex justify-between items-center gap-2">
        <p className="text-base text-center text-[#68d391]">Patterns</p>
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
        transition={{ duration: 1 }}
        exit={{ y: 100 }}
        className={`absolute top-16 right-4 z-10 w-80 bg-zinc-800 p-2 rounded-xl space-y-2`}
        style={{ display: showMenu ? "block" : "none" }}
      >
        <p className="text-base  text-white">Choose colors</p>
        <div className="flex items-center justify-center space-x-2">
          <ColorPicker
            label="Alive"
            color={aliveColor}
            onChange={setAliveColor}
          />
          <ColorPicker label="Dead" color={deadColor} onChange={setDeadColor} />
        </div>
        <p className="text-base  text-white mt-2">Choose a pattern</p>
        <div
          className="flex flex-wrap gap-1 justify-between px-2 overflow-y-auto  py-2"
          style={{ maxHeight: "400px" }}
        >
          {Object.keys(patterns).map((pattern) => (
            <button
              key={pattern}
              onClick={() => applyPattern(patterns[pattern])}
              className="bg-black text-white px-2 py-1 rounded hover:bg-zinc-800"
            >
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  {renderPatternPreview(
                    patterns[pattern],
                    aliveColor,
                    deadColor
                  )}
                </div>
                {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Menu;
