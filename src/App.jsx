import { useState } from "react";
import { Game, Instructions } from "./components";

function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => setShowInstructions((prev) => !prev);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-center mb-4">Conway's Game of Life</h1>
      <button
        onClick={toggleInstructions}
        className="my-2 px-4 py-2 bg-white text-black rounded hover:bg-green-400"
      >
        Instructions
      </button>
      <Game />
      {showInstructions && <Instructions onClose={toggleInstructions} />}
    </div>
  );
}

export default App;
