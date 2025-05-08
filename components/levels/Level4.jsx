import React, { useState } from 'react';
import { motion } from 'framer-motion';

const options = [
  { id: 'transfer', label: 'Transfer', correct: true },
  { id: 'bills', label: 'Pay Bills', correct: false, message: "This isn’t the time to pay bills 😂" },
  { id: 'airtime', label: 'Buy Airtime', correct: false, message: "You're not out of airtime yet 😅" },
];

const Level4 = ({ onNext }) => {
  const [wrongMessage, setWrongMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0); // To force re-animation

  const handleClick = (option) => {
    if (option.correct) {
      onNext?.(); // safely trigger next stage
    } else {
      setWrongMessage(option.message);
      setShakeKey((prev) => prev + 1);
      setTimeout(() => setWrongMessage(''), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h2 className="text-2xl font-bold mb-8">What do you want to do?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-xl">
        {options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleClick(option)}
            whileTap={{ scale: 0.9 }}
            className="glassmorphism py-4 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-100 transition"
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      {wrongMessage && (
        <motion.div
          key={shakeKey}
          initial={{ x: 0 }}
          animate={{ x: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-red-500 text-lg font-semibold"
        >
          {wrongMessage}
        </motion.div>
      )}
    </div>
  );
};

export default Level4;
