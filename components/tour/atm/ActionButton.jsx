import { motion } from "framer-motion";

const ActionButton = ({ label, onClick, color = "blue" }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`
        bg-${color}-700 hover:bg-${color}-600 active:bg-${color}-800
        py-3 px-6 rounded-lg transition-all text-white
        shadow-md active:shadow-inner
      `}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default ActionButton;