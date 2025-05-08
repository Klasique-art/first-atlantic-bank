import React, { useState } from 'react';
import { motion } from 'framer-motion';

const correctCode = '1234';

const Level5 = ({ onNext }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);

  const handleKeyPress = (val) => {
    if (code.length < 4) {
      setCode((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setCode('');
    setError('');
  };

  const handleSubmit = () => {
    if (code === correctCode) {
      // Optional: play success sound here
      onNext?.();
    } else {
      setError('Oops! Try again 😬');
      setShakeKey((prev) => prev + 1);
      setCode('');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="text-2xl font-bold mb-6">Enter 4-digit PIN</h2>

      {/* OTP Input */}
      <motion.div
        key={shakeKey}
        animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="flex gap-4 mb-4"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-12 h-14 border border-gray-400 rounded-md text-2xl font-bold flex items-center justify-center bg-white text-primary"
          >
            {code[i] || ''}
          </div>
        ))}
      </motion.div>

      {/* Error Message */}
      {error && <p className="text-red-300 font-medium mb-4">{error}</p>}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 max-w-[250px] w-full">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map((item) => (
          <motion.button
            key={item}
            onClick={() =>
              item === 'C'
                ? handleClear()
                : item === '✓'
                ? handleSubmit()
                : handleKeyPress(item.toString())
            }
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.05 }}
            className="glass p-2 text-lg font-bold rounded-xl shadow-md transition"
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Level5;
