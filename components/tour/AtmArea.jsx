'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActionButton, MainButton, ProcessingAnimation, TransactionScreen } from '.';
import Link from 'next/link';

const AtmArea = () => {
  // ATM state management
  const [screen, setScreen] = useState('main');
  const [activeButton, setActiveButton] = useState(null);
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [balance, setBalance] = useState('2,547.63');
  const [transactions, setTransactions] = useState([
    { date: '05/08/25', desc: 'Grocery Store', amount: '-GHC82.45' },
    { date: '05/06/25', desc: 'Salary Deposit', amount: '+GHC1,950.00' },
    { date: '05/05/25', desc: 'Gas Station', amount: '-GHC45.28' },
    { date: '05/03/25', desc: 'ATM Withdrawal', amount: '-GHC100.00' },
    { date: '05/01/25', desc: 'Monthly Subscription', amount: '-GHC14.99' }
  ]);

  // Date and time display
  const [dateTime, setDateTime] = useState('');
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      setDateTime(now.toLocaleString('en-US', options));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle button press with realistic feedback
  const handleButtonPress = (option) => {
    setActiveButton(option);
    setTimeout(() => {
      setActiveButton(null);
      setScreen(option);
      
      if (option === 'check-balance') {
        setProcessing(true);
        setTimeout(() => {
          setProcessing(false);
        }, 1500);
      }
    }, 200);
  };

  // Handle going back to main menu
  const handleBack = () => {
    setScreen('main');
    setAmount('');
    setReceipt(false);
  };

  // Keypad functionality for withdraw/deposit
  const handleKeypadPress = (value) => {
    if (value === 'clear') {
      setAmount('');
    } else if (value === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else if (amount.length < 6) { // Limit to reasonable amount
      setAmount(prev => prev + value);
    }
  };

  // Process transactions
  const processTransaction = (type) => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setReceipt(true);
      // Update balance for demo purposes
      if (type === 'withdraw') {
        const newBalance = parseFloat(balance.replace(',', '')) - parseFloat(amount || 0);
        setBalance(newBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      } else if (type === 'deposit') {
        const newBalance = parseFloat(balance.replace(',', '')) + parseFloat(amount || 0);
        setBalance(newBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      }
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-5">
      <Link href="/tour" className='absolute top-5 left-5 text-white bg-primary px-6 py-4 rounded-full'>
        <p>Go back</p>
      </Link>
      {/* ATM Physical Casing */}
      <div className="relative max-w-4xl w-full">
        {/* ATM Header with bank logo and card slot */}
        <div className="bg-gray-800 rounded-t-3xl p-3 flex justify-between items-center border-b-4 border-gray-700">
          <div className="text-purple-400 font-bold text-xl tracking-tight">FIRST ATLANTIC ATM</div>
          <div className="flex items-center space-x-4">
            <div className="h-1 w-24 bg-gray-600 rounded-full"></div>
            <div className="bg-gray-900 px-4 py-1 rounded-md text-gray-400 text-xs border border-gray-700">INSERT CARD</div>
          </div>
        </div>
        
        {/* ATM Body with 3D screen effect */}
        <div className="relative bg-gray-800 p-5 shadow-2xl border-l-8 border-r-8 border-gray-700">
          {/* Screen bezel with 3D effect */}
          <div 
            className="relative bg-black rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 0 0 2px rgba(30, 30, 30, 1), 0 0 0 4px rgba(20, 20, 20, 1), inset 0 0 10px rgba(0, 0, 0, 0.5)',
              transform: 'perspective(1000px) rotateX(5deg)',
              transformOrigin: 'center bottom'
            }}
          >
            {/* Screen glare effect */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none opacity-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)',
              }}
            ></div>
            
            {/* Screen content */}
            <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-black p-6 min-h-96">
              {/* ATM Status Bar */}
              <div className="flex justify-between items-center mb-4 text-xs text-blue-200 bg-black/30 p-2 rounded">
                <div>Card: **** **** **** 5678</div>
                <div>{dateTime}</div>
              </div>
              
              {/* Main screen switching based on state */}
              <AnimatePresence mode="wait">
                {screen === 'main' && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <h1 className="text-3xl font-bold mb-4 text-white">Welcome to First Atlantic Bank</h1>
                    <div className="text-blue-200 mb-4">Please select a transaction</div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <MainButton 
                        label="Withdraw Cash" 
                        icon="💵" 
                        color="blue" 
                        isActive={activeButton === 'withdraw'} 
                        onClick={() => handleButtonPress('withdraw')}
                      />
                      <MainButton 
                        label="Deposit Cash" 
                        icon="💰" 
                        color="green" 
                        isActive={activeButton === 'deposit'} 
                        onClick={() => handleButtonPress('deposit')}
                      />
                      <MainButton 
                        label="Check Balance" 
                        icon="📊" 
                        color="purple" 
                        isActive={activeButton === 'check-balance'} 
                        onClick={() => handleButtonPress('check-balance')}
                      />
                      <MainButton 
                        label="Mini Statement" 
                        icon="📝" 
                        color="amber" 
                        isActive={activeButton === 'mini-statement'} 
                        onClick={() => handleButtonPress('mini-statement')}
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Withdraw Cash Screen */}
                {screen === 'withdraw' && (
                  <TransactionScreen 
                    title="WITHDRAW CASH" 
                    type="withdraw"
                    amount={amount}
                    onKeypadPress={handleKeypadPress}
                    onProcess={() => processTransaction('withdraw')}
                    onBack={handleBack}
                    processing={processing}
                    receipt={receipt}
                    balance={balance}
                  />
                )}
                
                {/* Deposit Cash Screen */}
                {screen === 'deposit' && (
                  <TransactionScreen 
                    title="DEPOSIT CASH" 
                    type="deposit"
                    amount={amount}
                    onKeypadPress={handleKeypadPress}
                    onProcess={() => processTransaction('deposit')}
                    onBack={handleBack}
                    processing={processing}
                    receipt={receipt}
                    balance={balance}
                  />
                )}
                
                {/* Check Balance Screen */}
                {screen === 'check-balance' && (
                  <motion.div
                    key="balance"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-white">ACCOUNT BALANCE</h2>
                    
                    {processing ? (
                      <ProcessingAnimation text="Retrieving your balance..." />
                    ) : (
                      <>
                        <div className="bg-black/30 p-6 rounded-lg mb-8">
                          <div className="text-gray-300 mb-2">Available Balance:</div>
                          <div className="text-4xl font-bold text-green-400">GHC{balance}</div>
                        </div>
                        
                        <ActionButton label="Return to Main Menu" onClick={handleBack} />
                      </>
                    )}
                  </motion.div>
                )}
                
                {/* Mini Statement Screen */}
                {screen === 'mini-statement' && (
                  <motion.div
                    key="statement"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-left"
                  >
                    <h2 className="text-2xl font-bold mb-4 text-white text-center">RECENT TRANSACTIONS</h2>
                    
                    <div className="bg-black/30 p-4 rounded-lg mb-6 max-h-64 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="text-blue-300 border-b border-blue-900">
                          <tr>
                            <th className="py-2 text-left">Date</th>
                            <th className="py-2 text-left">Description</th>
                            <th className="py-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx, index) => (
                            <tr key={index} className="border-b border-blue-900/30">
                              <td className="py-3 text-gray-300">{tx.date}</td>
                              <td className="py-3 text-gray-300">{tx.desc}</td>
                              <td className={`py-3 text-right ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {tx.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="text-center">
                      <ActionButton label="Return to Main Menu" onClick={handleBack} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* ATM Footer with keypad and card slots */}
        <div className="bg-gray-800 rounded-b-3xl p-5 border-t-4 border-gray-700 flex justify-between">
          <div className="flex space-x-4">
            <div className="bg-gray-900 h-10 w-32 rounded-md flex items-center justify-center">
              <div className="h-1 w-full max-w-20 bg-gray-700 rounded-full"></div>
            </div>
            <div className="bg-gray-900 h-10 w-10 rounded-md"></div>
          </div>
          <div className="flex space-x-2">
            <div className="bg-green-800 h-6 w-6 rounded-full"></div>
            <div className="bg-red-800 h-6 w-6 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AtmArea;