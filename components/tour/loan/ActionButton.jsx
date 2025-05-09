import { motion } from "framer-motion";

const ActionButton = ({ label, onClick, color = "blue", disabled = false }) => {
  const baseClasses = `
    py-3 px-6 rounded-lg transition-all text-white
    shadow-md active:shadow-inner
  `;
  
  const colorClasses = {
    purple: `bg-purple-700 hover:bg-purple-600 active:bg-purple-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    blue: `bg-blue-700 hover:bg-blue-600 active:bg-blue-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    green: `bg-green-700 hover:bg-green-600 active:bg-green-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    gray: `bg-gray-700 hover:bg-gray-600 active:bg-gray-800 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
  };

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`${baseClasses} ${colorClasses[color]}`}
      onClick={disabled ? null : onClick}
      disabled={disabled}
    >
      {label}
    </motion.button>
  );
};

export default ActionButton;