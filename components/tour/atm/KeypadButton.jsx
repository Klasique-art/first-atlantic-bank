import { motion } from 'framer-motion';

const KeypadButton = ({ value, onClick, span = false }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`
        bg-gray-800 text-white font-medium text-lg p-3 rounded-lg
        border border-gray-700 shadow-md active:shadow-inner
        ${span ? 'col-span-2' : ''}
      `}
      onClick={() => onClick(value)}
    >
      {value === 'backspace' ? '⌫' : value === 'clear' ? 'Clear' : value}
    </motion.button>
  );
};

export default KeypadButton;