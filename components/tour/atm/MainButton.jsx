import { motion } from 'framer-motion';

const MainButton = ({ label, icon, color, isActive, onClick }) => {
  const colors = {
    blue: 'from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 active:from-blue-800 active:to-blue-950',
    green: 'from-green-700 to-green-900 hover:from-green-600 hover:to-green-800 active:from-green-800 active:to-green-950',
    purple: 'from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 active:from-purple-800 active:to-purple-950',
    amber: 'from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 active:from-amber-800 active:to-amber-950',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`
        bg-gradient-to-b ${colors[color]} 
        p-4 rounded-xl shadow-lg text-white
        border border-${color}-600 relative overflow-hidden
        transition-all duration-200
        ${isActive ? 'translate-y-1 shadow-inner' : 'shadow-md'}
      `}
      onClick={onClick}
      style={{
        boxShadow: isActive ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-medium">{label}</div>
      {/* Button reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-10"></div>
    </motion.button>
  );
};

export default MainButton;