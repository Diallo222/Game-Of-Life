import React from "react";

const Instructions = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg max-w-md w-full text-black text-center">
        <h2 className="text-lg  mb-2 ">
          How Conway's Game of Life Works ?
        </h2>
        <p className="mb-4 text-left">
          Conway's Game of Life is a cellular automaton devised by mathematician
          John Conway in 1970. It consists of a grid of cells, each of which can
          be alive or dead. The state of each cell changes over time based on the
          following rules:
        </p>
        <ul className="list-disc ml-4 mb-4 text-left">
          <li>A live cell with fewer than two live neighbors dies (underpopulation).</li>
          <li>A live cell with two or three live neighbors lives on to the next generation.</li>
          <li>A live cell with more than three live neighbors dies (overpopulation).</li>
          <li>A dead cell with exactly three live neighbors becomes a live cell (reproduction).</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Instructions;
