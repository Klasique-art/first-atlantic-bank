import { motion } from "framer-motion";

const ProcessingAnimation = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative h-12 w-12 mb-4">
        <motion.div
          className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-400 border-b-blue-300 border-l-blue-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-blue-200">{text}</p>
    </div>
  );
};

export default ProcessingAnimation;