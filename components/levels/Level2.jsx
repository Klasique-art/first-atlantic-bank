import React, { useState } from 'react';
import { motion } from 'framer-motion';

const recipients = [
  {
    id: 1,
    name: 'Mom',
    image: '/assets/mom.webp',
    isCorrect: true,
  },
  {
    id: 2,
    name: 'Friend',
    image: '/assets/friend.jpg',
    isCorrect: false,
    feedback: "You don’t owe your friend 😅",
  },
  {
    id: 3,
    name: 'Business Partner',
    image: '/assets/business.jpg',
    isCorrect: false,
    feedback: "This isn’t a business deal! 😎",
  },
];

const Level2 = ({ onNext }) => {
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (recipient) => {
    setSelected(recipient.id);
    if (recipient.isCorrect) {
      const audio = new Audio("/sounds/sound.mp3");
      audio.play();

      setTimeout(() => {
        onNext();
      }, 1100);
    } else {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        setSelected(null);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="text-2xl font-bold mb-6">Select who you want to send money to</h2>

      <div className="flex gap-6">
        {recipients.map((recipient) => (
          <motion.div
            key={recipient.id}
            className={`flex flex-1 glassmorphism flex-col items-center cursor-pointer p-4 rounded-xl border ${
              selected === recipient.id ? 'border-blue-500 scale-105' : 'border-gray-300'
            }`}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleSelect(recipient)}
          >
            <img
              src={recipient.image}
              alt={recipient.name}
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <p className="font-medium text-xs">{recipient.name}</p>
          </motion.div>
        ))}
      </div>

      {showFeedback && !recipients.find(r => r.id === selected)?.isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 text-red-500 font-semibold"
        >
          {recipients.find(r => r.id === selected)?.feedback}
        </motion.div>
      )}
    </div>
  );
};

export default Level2;
