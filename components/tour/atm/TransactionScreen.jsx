import {motion} from 'framer-motion';
import { ProcessingAnimation, ActionButton, KeypadButton } from '..';

const TransactionScreen = ({ 
  title, 
  type, 
  amount, 
  onKeypadPress, 
  onProcess, 
  onBack, 
  processing,
  receipt,
  balance
}) => {
  const formattedAmount = amount ? `GHC${amount}` : 'GHC0';
  
  return (
    <motion.div
      key={type}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="text-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      
      {processing ? (
        <ProcessingAnimation text={`Processing your ${type}...`} />
      ) : receipt ? (
        <div className="bg-white text-black p-6 rounded-lg mb-6 max-w-md mx-auto">
          <div className="text-center border-b-2 border-dashed border-gray-300 pb-4 mb-4">
            <div className="text-xl font-bold mb-1">TRANSACTION RECEIPT</div>
            <div className="text-gray-500 text-sm">{new Date().toLocaleString()}</div>
          </div>
          
          <div className="flex justify-between mb-2">
            <div className="text-gray-600">Transaction Type:</div>
            <div className="font-medium capitalize">{type}</div>
          </div>
          
          <div className="flex justify-between mb-2">
            <div className="text-gray-600">Amount:</div>
            <div className="font-medium text-xl">GHC{amount || '0'}</div>
          </div>
          
          <div className="flex justify-between mb-4">
            <div className="text-gray-600">New Balance:</div>
            <div className="font-medium">GHC{balance}</div>
          </div>
          
          <div className="text-center text-green-600 font-bold text-lg mt-6 mb-2">
            Transaction Successful
          </div>
          <div className="text-gray-500 text-xs text-center">
            Thank you for using SecureBank ATM
          </div>
        </div>
      ) : (
        <>
          <div className="bg-black/30 p-6 rounded-lg mb-6">
            <div className="text-gray-300 mb-2">Enter Amount:</div>
            <div className="text-4xl font-bold text-green-400">{formattedAmount}</div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'clear', 0, 'backspace'].map((value) => (
              <KeypadButton 
                key={value} 
                value={value} 
                onClick={onKeypadPress}
                span={value === 'clear'}
              />
            ))}
          </div>
          
          <div className="flex justify-between">
            <ActionButton label="Back" onClick={onBack} color="gray" />
            <ActionButton 
              label={`Confirm ${type}`} 
              onClick={onProcess} 
              color={amount && parseFloat(amount) > 0 ? "green" : "gray"}
            />
          </div>
        </>
      )}
      
      {receipt && (
        <div className="mt-6">
          <ActionButton label="Return to Main Menu" onClick={onBack} />
        </div>
      )}
    </motion.div>
  );
};

export default TransactionScreen;