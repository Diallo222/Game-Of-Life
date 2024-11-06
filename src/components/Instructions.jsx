import { motion } from "framer-motion";

const Instructions = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full text-black text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <h2 className="text-xl mb-4">How Conway's Game of Life Works</h2>
        <p className="mb-4 text-left">
          Conway's Game of Life is a cellular automaton devised by mathematician
          John Conway in 1970. It consists of a grid of cells, each of which can
          be alive or dead. The state of each cell changes over time based on
          the following rules:
        </p>
        <div className="bg-zinc-900 p-4 rounded-xl">
          <ul className="list-disc space-y-3 ml-2 text-left text-white">
            <li>
              A live cell with fewer than two live neighbors dies
              (underpopulation).
            </li>
            <li>
              A live cell with two or three live neighbors lives on to the next
              generation.
            </li>
            <li>
              A live cell with more than three live neighbors dies
              (overpopulation).
            </li>
            <li>
              A dead cell with exactly three live neighbors becomes a live cell
              (reproduction).
            </li>
          </ul>
        </div>

        <motion.button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-red-500 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Instructions;
