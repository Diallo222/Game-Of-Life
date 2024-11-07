import React from "react";

const ColorPicker = ({ label, color, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-white">{label}</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 p-0 bg-transparent cursor-pointer border-none ring-0 outline-none"
      />
    </div>
  );
};

export default ColorPicker;
