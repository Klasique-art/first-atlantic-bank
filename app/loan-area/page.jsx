'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loanOptions } from '@/staticData';
import { ProcessingAnimation, MainButton } from '@/components/tour';
import ActionButton from '@/components/tour/loan/ActionButton';
import Link from 'next/link';

const LoanAreaPage = () => {
  // Loan application state management
  const [screen, setScreen] = useState('main');
  const [activeButton, setActiveButton] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState(36); // Default 36 months
  const [interestRate, setInterestRate] = useState(5.9);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState('pending');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    income: '',
    address: '',
    employment: 'Full-time'
  });
  
  // User's existing loans for display
  const [existingLoans, setExistingLoans] = useState([
    { id: 'L2023-5671', type: 'Auto Loan', amount: 'GHC18,450.00', rate: '4.5%', remaining: 'GHC12,382.45', status: 'Active' },
    { id: 'L2022-9834', type: 'Personal Loan', amount: 'GHC5,000.00', rate: '7.2%', remaining: 'GHC1,842.10', status: 'Active' },
    { id: 'L2020-6723', type: 'Home Loan', amount: 'GHC320,000.00', rate: '3.1%', remaining: 'GHC275,690.33', status: 'Active' }
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

  // Calculate monthly payment based on loan amount, term, and interest rate
  useEffect(() => {
    if (loanAmount && loanTerm) {
      const principal = parseFloat(loanAmount.replace(/,/g, ''));
      const monthlyRate = interestRate / 100 / 12;
      const payments = loanTerm;
      
      if (principal > 0 && payments > 0 && monthlyRate > 0) {
        const x = Math.pow(1 + monthlyRate, payments);
        const monthly = (principal * x * monthlyRate) / (x - 1);
        setMonthlyPayment(monthly.toFixed(2));
      } else {
        setMonthlyPayment(0);
      }
    }
  }, [loanAmount, loanTerm, interestRate]);

  // Handle button press with realistic feedback
  const handleButtonPress = (option) => {
    setActiveButton(option);
    setTimeout(() => {
      setActiveButton(null);
      setScreen(option);
    }, 200);
  };

  // Handle selecting a loan type
  const handleSelectLoanType = (type) => {
    const selectedLoan = loanOptions.find(loan => loan.id === type);
    setLoanType(type);
    setInterestRate(selectedLoan.baseRate);
    setScreen('loan-details');
  };
  
  // Handle going back to previous screen
  const handleBack = (targetScreen = 'main') => {
    setScreen(targetScreen);
  };

  // Format currency input
  const formatCurrency = (value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue === '') return '';
    
    // Convert to number and format with commas
    return parseFloat(numericValue)
      .toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  // Handle loan amount input
  const handleAmountChange = (value) => {
    setLoanAmount(formatCurrency(value));
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Process loan application
  const submitLoanApplication = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setApplicationSubmitted(true);
      // Randomly determine application status for demo purposes
      const statuses = ['approved', 'pending-review', 'conditionally-approved'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setApplicationStatus(randomStatus);
      
      // Add to existing loans list if approved for demo purposes
      if (randomStatus === 'approved') {
        const newLoan = {
          id: `L${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          type: loanOptions.find(loan => loan.id === loanType).name,
          amount: `GHC${loanAmount}`,
          rate: `${interestRate}%`,
          remaining: `GHC${loanAmount}`,
          status: 'Pending Activation'
        };
        setExistingLoans([newLoan, ...existingLoans]);
      }
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Link href="/tour" className='absolute top-5 left-5 text-white bg-primary px-6 py-4 rounded-full'>
              <p>Go back</p>
            </Link>
      {/* Loan Portal Physical Casing */}
      <div className="relative max-w-4xl w-full">
        {/* Header with bank logo */}
        <div className="bg-gray-800 rounded-t-3xl p-4 flex justify-between items-center border-b-4 border-gray-700">
          <div className="text-purple-400 font-bold text-xl tracking-tight">FIRST ATLANTIC BANK LOAN CENTER</div>
          <div className="flex items-center space-x-4">
            <div className="h-1 w-24 bg-gray-600 rounded-full"></div>
            <div className="bg-gray-900 px-4 py-1 rounded-md text-gray-400 text-xs border border-gray-700">ATLANTIC PORTAL</div>
          </div>
        </div>
        
        {/* Loan Portal Body with 3D screen effect */}
        <div className="relative bg-gray-800 p-2 shadow-2xl border-l-8 border-r-8 border-gray-700">
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
            <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-6 min-h-96">
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-4 text-xs text-purple-200 bg-black/30 p-2 rounded">
                <div>User: John Doe</div>
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
                    <h1 className="text-3xl font-bold mb-6 text-white">Loan Services Portal</h1>
                    <div className="text-purple-200 mb-8">What would you like to do today?</div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <MainButton 
                        label="Apply for Loan" 
                        icon="📝" 
                        color="purple" 
                        isActive={activeButton === 'apply-loan'} 
                        onClick={() => handleButtonPress('apply-loan')}
                      />
                      <MainButton 
                        label="My Loans" 
                        icon="📊" 
                        color="blue" 
                        isActive={activeButton === 'my-loans'} 
                        onClick={() => handleButtonPress('my-loans')}
                      />
                      <MainButton 
                        label="Loan Calculator" 
                        icon="🧮" 
                        color="green" 
                        isActive={activeButton === 'loan-calculator'} 
                        onClick={() => handleButtonPress('loan-calculator')}
                      />
                      <MainButton 
                        label="Contact Support" 
                        icon="💬" 
                        color="amber" 
                        isActive={activeButton === 'contact-support'} 
                        onClick={() => handleButtonPress('contact-support')}
                      />
                    </div>
                    
                    <div className="bg-black/30 p-4 rounded-lg">
                      <h3 className="text-purple-300 text-lg font-medium mb-3">Special Loan Offers</h3>
                      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-md p-3 mb-3">
                        <div className="text-white font-bold">Home Loan Refinance</div>
                        <div className="text-purple-200 text-sm">Rates as low as 3.5% APR</div>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-md p-3">
                        <div className="text-white font-bold">Student Loan Consolidation</div>
                        <div className="text-purple-200 text-sm">Save with our new payment plans</div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Apply for Loan Screen */}
                {screen === 'apply-loan' && (
                  <motion.div
                    key="apply-loan"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-white">Select Loan Type</h2>
                    <div className="text-purple-200 mb-6">Please select the type of loan you wish to apply for</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {loanOptions.map((loan) => (
                        <motion.button
                          key={loan.id}
                          whileTap={{ scale: 0.97 }}
                          className="bg-black/30 p-4 rounded-lg text-left border border-purple-800 hover:border-purple-500 transition-colors"
                          onClick={() => handleSelectLoanType(loan.id)}
                        >
                          <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2">{loan.icon}</span>
                            <span className="text-white font-medium">{loan.name}</span>
                          </div>
                          <div className="text-purple-200 text-sm">{loan.description}</div>
                          <div className="text-purple-300 text-xs mt-2">
                            GHC{loan.minAmount.toLocaleString()} - GHC{loan.maxAmount.toLocaleString()}
                          </div>
                          <div className="text-purple-300 text-xs">
                            From {loan.baseRate}% APR
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    
                    <ActionButton label="Back to Main Menu" onClick={() => handleBack()} color="gray" />
                  </motion.div>
                )}
                
                {/* Loan Details Screen */}
                {screen === 'loan-details' && (
                  <motion.div
                    key="loan-details"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-6">
                      <button 
                        className="text-purple-300 hover:text-purple-100 mr-4"
                        onClick={() => handleBack('apply-loan')}
                      >
                        ← Back
                      </button>
                      <h2 className="text-2xl font-bold text-white">Loan Details</h2>
                    </div>
                    
                    <div className="bg-black/30 p-5 rounded-lg mb-6">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-2">
                          {loanOptions.find(loan => loan.id === loanType)?.icon}
                        </span>
                        <span className="text-white font-medium text-lg">
                          {loanOptions.find(loan => loan.id === loanType)?.name}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Loan Amount</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">GHC</span>
                            <input
                              type="text"
                              value={loanAmount}
                              onChange={(e) => handleAmountChange(e.target.value)}
                              className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 pl-14 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Enter amount"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Loan Term</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[12, 24, 36, 48, 60, 72].map((months) => (
                              <button
                                key={months}
                                className={`
                                  py-2 px-3 rounded-md text-sm
                                  ${loanTerm === months 
                                    ? 'bg-purple-700 text-white' 
                                    : 'bg-gray-800 text-purple-200 hover:bg-gray-700'}
                                `}
                                onClick={() => setLoanTerm(months)}
                              >
                                {months} months
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Interest Rate</label>
                          <div className="text-2xl font-bold text-white">{interestRate}% <span className="text-sm font-normal text-purple-300">APR</span></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-900/30 p-5 rounded-lg mb-6 border border-purple-800">
                      <div className="text-center mb-3">
                        <div className="text-purple-200 text-sm">Estimated Monthly Payment</div>
                        <div className="text-3xl font-bold text-white">
                          GHC{parseFloat(monthlyPayment).toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-purple-200">Total Principal</div>
                          <div className="text-white">GHC{loanAmount || '0'}</div>
                        </div>
                        <div>
                          <div className="text-purple-200">Total Interest</div>
                          <div className="text-white">
                            GHC{loanAmount && monthlyPayment > 0 
                              ? (monthlyPayment * loanTerm - parseFloat(loanAmount.replace(/,/g, ''))).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                              : '0.00'}
                          </div>
                        </div>
                        <div>
                          <div className="text-purple-200">Loan Term</div>
                          <div className="text-white">{loanTerm} months</div>
                        </div>
                        <div>
                          <div className="text-purple-200">Total Repayment</div>
                          <div className="text-white">
                            GHC{loanAmount && monthlyPayment > 0 
                              ? (monthlyPayment * loanTerm).toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) 
                              : '0.00'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <ActionButton label="Back" onClick={() => handleBack('apply-loan')} color="gray" />
                      <ActionButton 
                        label="Continue" 
                        onClick={() => handleButtonPress('personal-info')} 
                        color="purple" 
                        disabled={!loanAmount || parseFloat(loanAmount.replace(/,/g, '')) <= 0}
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Personal Information Screen */}
                {screen === 'personal-info' && (
                  <motion.div
                    key="personal-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-6">
                      <button 
                        className="text-purple-300 hover:text-purple-100 mr-4"
                        onClick={() => handleBack('loan-details')}
                      >
                        ← Back
                      </button>
                      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                    </div>
                    
                    <div className="bg-black/30 p-5 rounded-lg mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Full Name</label>
                          <input
                            type="text"
                            value={personalInfo.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your full name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Email Address</label>
                          <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Phone Number</label>
                          <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Annual Income</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">GHC</span>
                            <input
                              type="text"
                              value={personalInfo.income}
                              onChange={(e) => handleInputChange('income', formatCurrency(e.target.value))}
                              className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 pl-14 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder="Enter your annual income"
                            />
                          </div>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-purple-200 mb-1 text-sm">Home Address</label>
                          <input
                            type="text"
                            value={personalInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your home address"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm">Employment Status</label>
                          <select
                            value={personalInfo.employment}
                            onChange={(e) => handleInputChange('employment', e.target.value)}
                            className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Self-employed">Self-employed</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Retired">Retired</option>
                            <option value="Student">Student</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 p-4 rounded-lg mb-6 text-sm text-purple-200">
                      <div className="flex items-start mb-2">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 mr-2"
                        />
                        <label htmlFor="terms">
                          I confirm that all information provided is accurate and complete. I authorize FIRST ATLANTIC BANK to verify this information and check my credit history.
                        </label>
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="mt-1 mr-2"
                        />
                        <label htmlFor="privacy">
                          I have read and agree to the Terms and Conditions and Privacy Policy of FIRST ATLANTIC BANK.
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <ActionButton label="Back" onClick={() => handleBack('loan-details')} color="gray" />
                      <ActionButton 
                        label="Submit Application" 
                        onClick={submitLoanApplication} 
                        color="purple" 
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Processing Screen */}
                {screen === 'personal-info' && processing && (
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProcessingAnimation text="Processing your application..." />
                  </motion.div>
                )}
                
                {/* Application Submitted Screen */}
                {screen === 'personal-info' && applicationSubmitted && (
                  <motion.div
                    className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-xl max-w-md w-full">
                      {applicationStatus === 'approved' && (
                        <>
                          <div className="flex justify-center mb-4">
                            <div className="bg-green-500 h-16 w-16 rounded-full flex items-center justify-center text-3xl">
                              ✓
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white text-center mb-2">Application Approved!</h3>
                          <p className="text-purple-200 text-center mb-6">
                            Congratulations! Your loan application has been approved. The funds will be deposited into your account within 3-5 business days.
                          </p>
                        </>
                      )}
                      
                      {applicationStatus === 'pending-review' && (
                        <>
                          <div className="flex justify-center mb-4">
                            <div className="bg-yellow-500 h-16 w-16 rounded-full flex items-center justify-center text-3xl">
                              ⏱
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white text-center mb-2">Application Under Review</h3>
                          <p className="text-purple-200 text-center mb-6">
                            Your application has been submitted and is being reviewed by our team. This typically takes 1-2 business days.
                          </p>
                        </>
                      )}
                      
                      {applicationStatus === 'conditionally-approved' && (
                        <>
                          <div className="flex justify-center mb-4">
                            <div className="bg-blue-500 h-16 w-16 rounded-full flex items-center justify-center text-3xl">
                              🔍
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-white text-center mb-2">Conditionally Approved</h3>
                          <p className="text-purple-200 text-center mb-6">
                            Your application is conditionally approved. We need some additional documentation to finalize your loan. Check your email for details.
                          </p>
                        </>
                      )}
                      
                      <div className="bg-black/30 p-4 rounded-lg mb-4">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="text-purple-300">Application ID:</div>
                          <div className="text-white">APP-{Math.floor(100000 + Math.random() * 900000)}</div>
                          
                          <div className="text-purple-300">Loan Type:</div>
                          <div className="text-white">{loanOptions.find(loan => loan.id === loanType)?.name}</div>
                          
                          <div className="text-purple-300">Loan Amount:</div>
                          <div className="text-white">GHC{loanAmount}</div>
                          
                          <div className="text-purple-300">Term:</div>
                          <div className="text-white">{loanTerm} months</div>
                          
                          <div className="text-purple-300">Interest Rate:</div>
                          <div className="text-white">{interestRate}% APR</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <ActionButton 
                          label="Return to Main Menu" 
                          onClick={() => {
                            setScreen('main');
                            setApplicationSubmitted(false);
                            setLoanAmount('');
                            setLoanType('');
                          }} 
                          color="purple" 
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* My Loans Screen */}
                {screen === 'my-loans' && (
                  <motion.div
                    key="my-loans"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">My Loans</h2>
                      <button 
                        className="text-purple-300 hover:text-purple-100 text-sm"
                        onClick={() => handleBack()}
                      >
                        Back to Main Menu
                      </button>
                    </div>
                    
                    <div className="bg-black/30 p-4 rounded-lg mb-6">
                      <table className="w-full text-sm">
                        <thead className="text-purple-300 border-b border-purple-900">
                          <tr>
                            <th className="py-2 text-left">Loan ID</th>
                            <th className="py-2 text-left">Type</th>
                            <th className="py-2 text-right">Amount</th>
                            <th className="py-2 text-center">Rate</th>
                            <th className="py-2 text-right">Remaining</th>
                            <th className="py-2 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {existingLoans.map((loan, index) => (
                            <tr key={index} className="border-b border-purple-900/30 hover:bg-purple-900/20">
                              <td className="py-3 text-purple-200">{loan.id}</td>
                              <td className="py-3 text-white">{loan.type}</td>
                              <td className="py-3 text-right text-white">{loan.amount}</td>
                              <td className="py-3 text-center text-white">{loan.rate}</td>
                              <td className="py-3 text-right text-white">{loan.remaining}</td>
                              <td className="py-3 text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium
                                  ${loan.status === 'Active' ? 'bg-green-900/60 text-green-300' :
                                    loan.status === 'Pending Activation' ? 'bg-yellow-900/60 text-yellow-300' :
                                    loan.status === 'Closed' ? 'bg-gray-800 text-gray-400' :
                                    'bg-purple-900/60 text-purple-300'
                                  }
                                `}>
                                  {loan.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-lg flex items-center">
                        <div className="bg-white/10 p-3 rounded-full mr-4">
                          <span className="text-2xl">💸</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Make a Payment</div>
                          <div className="text-purple-200 text-sm">Schedule or make loan payments</div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 rounded-lg flex items-center">
                        <div className="bg-white/10 p-3 rounded-full mr-4">
                          <span className="text-2xl">📄</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">Loan Documents</div>
                          <div className="text-purple-200 text-sm">Access your loan agreements</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/30 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-3">Payment Summary</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-purple-900/30 p-3 rounded-lg">
                          <div className="text-purple-300 text-sm mb-1">Next Payment</div>
                          <div className="text-white font-medium">May 15, 2025</div>
                        </div>
                        
                        <div className="bg-purple-900/30 p-3 rounded-lg">
                          <div className="text-purple-300 text-sm mb-1">Amount Due</div>
                          <div className="text-white font-medium">GHC1,842.50</div>
                        </div>
                        
                        <div className="bg-purple-900/30 p-3 rounded-lg">
                          <div className="text-purple-300 text-sm mb-1">Total Balance</div>
                          <div className="text-white font-medium">GHC289,914.88</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Loan Calculator Screen */}
                {screen === 'loan-calculator' && (
                  <motion.div
                    key="loan-calculator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">Loan Calculator</h2>
                      <button 
                        className="text-purple-300 hover:text-purple-100 text-sm"
                        onClick={() => handleBack()}
                      >
                        Back to Main Menu
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/30 p-5 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-4">Loan Parameters</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-purple-200 mb-1 text-sm">Loan Amount</label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">GHC</span>
                              <input
                                type="text"
                                value={loanAmount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 pl-14 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter amount"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-purple-200 mb-1 text-sm">Interest Rate (%)</label>
                            <input
                              type="number"
                              min="0"
                              max="30"
                              step="0.1"
                              value={interestRate}
                              onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                              className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-purple-200 mb-1 text-sm">Loan Term</label>
                            <div className="grid grid-cols-3 gap-2">
                              {[12, 24, 36, 48, 60, 72].map((months) => (
                                <button
                                  key={months}
                                  className={`
                                    py-2 px-3 rounded-md text-sm
                                    ${loanTerm === months 
                                      ? 'bg-purple-700 text-white' 
                                      : 'bg-gray-800 text-purple-200 hover:bg-gray-700'}
                                  `}
                                  onClick={() => setLoanTerm(months)}
                                >
                                  {months} months
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-purple-900/30 p-5 rounded-lg mb-6 border border-purple-800">
                          <h3 className="text-lg font-medium text-white mb-4">Loan Summary</h3>
                          
                          <div className="text-center mb-4">
                            <div className="text-purple-200 text-sm">Monthly Payment</div>
                            <div className="text-3xl font-bold text-white">
                              GHC{parseFloat(monthlyPayment).toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-purple-200">Total Principal</div>
                              <div className="text-white">GHC{loanAmount || '0'}</div>
                            </div>
                            <div>
                              <div className="text-purple-200">Total Interest</div>
                              <div className="text-white">
                                GHC{loanAmount && monthlyPayment > 0 
                                  ? (monthlyPayment * loanTerm - parseFloat(loanAmount.replace(/,/g, ''))).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                                  : '0.00'}
                              </div>
                            </div>
                            <div>
                              <div className="text-purple-200">Total Payments</div>
                              <div className="text-white">{loanTerm}</div>
                            </div>
                            <div>
                              <div className="text-purple-200">Total Cost</div>
                              <div className="text-white">
                                GHC{loanAmount && monthlyPayment > 0 
                                  ? (monthlyPayment * loanTerm).toLocaleString('en-GH', {minimumFractionDigits: 2, maximumFractionDigits: 2}) 
                                  : '0.00'}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-black/30 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-white mb-3">Looking to apply?</h3>
                          <p className="text-purple-200 text-sm mb-4">
                            Ready to move forward with your loan? Apply now to get started with your application.
                          </p>
                          <ActionButton 
                            label="Apply for This Loan" 
                            onClick={() => {
                              setScreen('apply-loan');
                            }} 
                            color="purple" 
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Contact Support Screen */}
                {screen === 'contact-support' && (
                  <motion.div
                    key="contact-support"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">Contact Support</h2>
                      <button 
                        className="text-purple-300 hover:text-purple-100 text-sm"
                        onClick={() => handleBack()}
                      >
                        Back to Main Menu
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-black/30 p-5 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-4">Contact Methods</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="bg-purple-900/50 p-2 rounded-full mr-3">
                              <span className="text-lg">📞</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">Phone Support</div>
                              <div className="text-purple-200">+233-20-800-FIRST-ATLANTIC-BANK</div>
                              <div className="text-purple-300 text-xs">Available 24/7</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="bg-purple-900/50 p-2 rounded-full mr-3">
                              <span className="text-lg">✉️</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">Email Support</div>
                              <div className="text-purple-200">loans@FIRSTATLANTICBANK.com</div>
                              <div className="text-purple-300 text-xs">Response within 24 hours</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="bg-purple-900/50 p-2 rounded-full mr-3">
                              <span className="text-lg">💬</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">Live Chat</div>
                              <div className="text-purple-200">Available on the FIRST ATLANTIC BANK app</div>
                              <div className="text-purple-300 text-xs">9AM - 9PM EST</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="bg-purple-900/50 p-2 rounded-full mr-3">
                              <span className="text-lg">🏢</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">Visit a Branch</div>
                              <div className="text-purple-200">Find your nearest branch</div>
                              <div className="text-purple-300 text-xs">Schedule an appointment</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/30 p-5 rounded-lg">
                        <h3 className="text-lg font-medium text-white mb-4">Send a Message</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-purple-200 mb-1 text-sm">Subject</label>
                            <select
                              className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                              <option>Loan Application Question</option>
                              <option>Loan Payment Issue</option>
                              <option>Interest Rate Inquiry</option>
                              <option>Loan Payoff Request</option>
                              <option>Other</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-purple-200 mb-1 text-sm">Your Message</label>
                            <textarea
                              className="w-full bg-gray-900 border border-purple-800 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
                              placeholder="How can we help you today?"
                            ></textarea>
                          </div>
                          
                          <ActionButton 
                            label="Send Message" 
                            onClick={() => {
                              alert('Message sent successfully!');
                            }} 
                            color="purple" 
                          />
                        </div>
                        
                        <div className="text-purple-300 text-xs mt-4">
                          A customer support representative will respond to your inquiry within 24 hours.
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-white mb-2">Frequently Asked Questions</h3>
                      <div className="space-y-3 text-sm">
                        <div className="bg-black/30 p-3 rounded-lg">
                          <div className="text-white font-medium mb-1">How long does the loan approval process take?</div>
                          <div className="text-purple-200">Most loan applications are processed within 1-2 business days.</div>
                        </div>
                        <div className="bg-black/30 p-3 rounded-lg">
                          <div className="text-white font-medium mb-1">Can I pay off my loan early?</div>
                          <div className="text-purple-200">Yes, FIRST ATLANTIC BANK doesn't charge early repayment fees on most loans.</div>
                        </div>
                        <div className="bg-black/30 p-3 rounded-lg">
                          <div className="text-white font-medium mb-1">How can I change my payment due date?</div>
                          <div className="text-purple-200">Contact customer support or visit your local branch to request a payment date change.</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Loan Portal Footer with decorative elements */}
        <div className="bg-gray-800 rounded-b-3xl p-5 border-t-4 border-gray-700 flex justify-between">
          <div className="flex space-x-4">
            <div className="bg-gray-900 h-10 w-32 rounded-md flex items-center justify-center">
              <div className="h-1 w-full max-w-20 bg-gray-700 rounded-full"></div>
            </div>
            <div className="bg-gray-900 h-10 w-10 rounded-md"></div>
          </div>
          <div className="flex space-x-2">
            <div className="bg-purple-800 h-6 w-6 rounded-full"></div>
            <div className="bg-indigo-800 h-6 w-6 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoanAreaPage;