import React from "react";
import { motion } from "framer-motion";
import { SiRetroarch } from "react-icons/si";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
        <SiRetroarch className="text-9xl text-stone-300 animate-bounce" />
      <p className="text-stone-300">Loading ...</p>
    </div>
  );
};

export default Loader;
