// components/levels/Level1.jsx
import { motion } from 'framer-motion';
import { logo } from '@/public/assets';

const Level1 = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Launch the App</h2>
      <p className="text-center mb-6">Tap the First Atlantic app to open it.</p>

      <motion.img
        src="https://firstatlanticbank.com.gh/wp-content/uploads/2023/01/fablogo34.jpg"
        alt="FAB App Icon"
        className="w-32 h-32 !cursor-pointer hover:scale-110 transition-transform rounded-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onClick={onNext}
      />
    </div>
  );
};

export default Level1;
