import React from 'react';
import { motion } from 'framer-motion';

const Welcome = ({ onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="bg-primary shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center" 
    >
        
      <h1 className="text-2xl uppercase font-bold text-white mb-4 text-shadow-2xs bg-black/10" data-aos="fade-up" data-aos-delay="200">
        Welcome to First Atlantic Bank
      </h1>
      <p className="text-gray-100 mb-6" data-aos="fade-up" data-aos-delay="400">
        Step into our virtual bank and explore the future of digital banking.
      </p>
      <button
        onClick={onContinue}
        className="px-6 py-2 bg-primary-100 text-white rounded-full duration-300 hover:bg-purple-800 transition-all"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        Enter the Bank
      </button>
    </motion.div>
  );
};

export default Welcome;
