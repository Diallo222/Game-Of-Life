import React, { memo } from "react";
import RetroButton from "./RetroButton";

const Controls = memo(({ toggleInstructions, running, onToggle, onClear, onRandomize }) => {
    return (
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 space-y-2 md:space-y-0">
      <RetroButton onpress={toggleInstructions} label={"Instructions"} />
        <RetroButton onpress={onToggle} label={running ? "Stop" : "Start"} />
        <RetroButton onpress={onRandomize} label="Randomize" />
        <RetroButton onpress={onClear} label="Clear" />
      </div>
    );
  });

export default Controls;
