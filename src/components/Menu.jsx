import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { patterns } from "../constants";

const cellSize = 6;

const renderPatternPreview = (pattern) => {
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
              backgroundColor: cell === 1 ? "#d4d4d8" : "#2d3748",
            }}
          />
        ))
      )}
    </div>
  );
};

const Menu = ({ showMenu, toggleMenu, applyPattern }) => {
  return (
    <motion.div
      className="menu absolute top-4 right-4 bg-white p-4 rounded shadow-lg w-96"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center px-4">
        <p className="text-xl text-center text-black">Patterns</p>
        <button
          onClick={toggleMenu}
          className="bg-black rounded text-white flex items-center justify-center px-4 py-2"
        >
          {showMenu ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
      <motion.div className={showMenu ? "block my-2" : "hidden"}>
        <p className="text-center mb-2 text-black mt-2">Generate a Pattern</p>
        <div
          className="flex flex-wrap gap-4 justify-between px-4 overflow-y-auto bg-zinc-800 p-4 rounded-xl"
          style={{ maxHeight: "600px" }}
        >
          {Object.keys(patterns).map((pattern) => (
            <button
              key={pattern}
              onClick={() => applyPattern(patterns[pattern])}
              className="bg-black text-white px-2 py-1 rounded hover:bg-zinc-800"
            >
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  {renderPatternPreview(patterns[pattern])}
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
