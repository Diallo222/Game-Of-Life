import { useState, useEffect } from "react";
import { Game } from "./components";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobileDevice = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkMobileDevice();
    window.addEventListener("resize", checkMobileDevice);
    return () => {
      window.removeEventListener("resize", checkMobileDevice);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-black text-white">
      {/* Display a message for mobile users */}
      {isMobile ? (
        <div className="text-center text-lg bg-red-500 p-4 rounded-md">
          <p>Please open this game on a computer for the best experience.</p>
        </div>
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;
