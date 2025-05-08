import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRESET_AMOUNTS = [100, 200, 500];

const Level3 = ({ onNext }) => {
  const [amount, setAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleNumberClick = (num) => {
    if (amount.length < 7) setAmount((prev) => prev + num);
  };

  const handleClear = () => {
    setAmount("");
    setShowAlert(false);
  };

  const handleSend = () => {
    const numeric = parseInt(amount);
    if (numeric > 10000) {
      setShowAlert(true);
    } else if (numeric > 0) {
      onNext?.();
    }
  };

  const handlePreset = (val) => {
    if (val > 1000) {
      setAmount(val.toString());
      setShowAlert(true);
    } else {
      setAmount(val.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h2 className="text-2xl font-bold mb-2">How much do you want to send?</h2>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="my-3 bg-primary-100 text-white px-6 py-3 rounded-lg font-semibold shadow"
          >
            🚨 Fraud Alert! You sure about sending that much? 😄
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white px-6 w-64 py-2 rounded-xl shadow-md mb-4 text-xl font-semibold border border-gray-300 text-primary">
        GHS {amount || "0"}
      </div>

      <div className="flex gap-3 mb-4">
        {PRESET_AMOUNTS.map((val) => (
          <button
            key={val}
            onClick={() => handlePreset(val)}
            className="bg-blue-100 hover:bg-blue-200 text-primary font-medium px-4 py-2 rounded-lg"
          >
            GHS {val}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6 w-64">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "C"].map((item) => (
          <motion.button
            key={item}
            onClick={() =>
              item === "C" ? handleClear() : handleNumberClick(item.toString())
            }
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="glass hover:bg-gray-200 text-md font-semibold py-3 rounded-lg"
          >
            {item}
          </motion.button>
        ))}
      </div>

      <button
        onClick={handleSend}
        className="bg-primary-100 hover:bg-primary text-white duration-300 font-bold px-6 py-2 rounded-lg"
      >
        Send Money
      </button>
    </div>
  );
};

export default Level3;
