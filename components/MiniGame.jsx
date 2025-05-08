// components/MiniGame.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';
import Level4 from './levels/Level4';
import Level5 from './levels/Level5';
import Level6 from './levels/Level6';
import { TypingText } from '.';

const MiniGame = () => {
  const [level, setLevel] = useState(1);

  const goToNextLevel = () => {
    setLevel(prev => prev + 1);
  };

  const resetLevel = () => {
    setLevel(1);
  };

  const renderLevel = () => {
    switch (level) {
      case 1:
        return <Level1 onNext={goToNextLevel} />;
      case 2:
        return <Level2 onNext={goToNextLevel} />;
      case 3:
        return <Level3 onNext={goToNextLevel} />;
      case 4:
        return <Level4 onNext={goToNextLevel} />;
      case 5:
        return <Level5 onNext={goToNextLevel} />;
      case 6:
        return <Level6 onNext={goToNextLevel} />;
      default:
        return (
          <div className="text-center space-y-6">
            <div className="text-2xl font-bold">🎉 Transaction Complete!</div>
            <button
              onClick={resetLevel}
              className="bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all text-white px-6 py-3 rounded-xl shadow-lg"
            >
              Do it again 
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary to-accent text-white py-12">
      <TypingText text="Experience the Power of Digital Banking" />
      <p className='mb-4'>Mobile banking is as easy as typing on your phone </p>

      <div className="glassmorphism rounded-xl p-8 shadow-2xl w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={level} // This triggers animation on level change
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            {renderLevel()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MiniGame;
