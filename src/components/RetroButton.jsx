import { motion } from "framer-motion";

const RetroButton = ({ label, onpress }) => {
  return (
    <motion.button
      onClick={onpress}
      whileTap={{
        scale: 0.95,
      }}
      className={`relative overflow-hidden min-w-44 px-6 py-1 bg-black text-base uppercase text-white hover:text-[#68d391] border-2 border-white hover:border-[#68d391] shadow-[4px_4px_0px_#71717a] transition duration-150 hover:shadow-none focus:outline-none`}
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        <span className="transition-transform duration-200 group-hover:scale-105">
          {label}
        </span>
      </div>
    </motion.button>
  );
};

export default RetroButton;
