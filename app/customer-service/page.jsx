'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

import { services, availableDates, availableTimes, branchLocations, tabVariants, itemVariants, contentVariants, chatBubbleVariants } from '@/staticData';
import Link from 'next/link';

const CustomerServicePage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('support');
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! Welcome to First Atlantic Bank Customer Support. How can I help you today?', time: '10:30 AM' }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [notification, setNotification] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showVirtualQueue, setShowVirtualQueue] = useState(false);
  const [queuePosition, setQueuePosition] = useState(null);
  const [waitTime, setWaitTime] = useState(null);
  const [showCallScheduler, setShowCallScheduler] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currencyRate, setCurrencyRate] = useState(14.5); // GHS to USD rate
  const [showSupportOptions, setShowSupportOptions] = useState(true);

  // Refs
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // Animations control
  const headerControls = useAnimation();
  const searchControls = useAnimation();
  
  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: 'How do I check my account balance?',
      answer: 'You can check your balance through our mobile app, internet banking, by visiting any branch, or by using our USSD code *422#. You can also request balance information via our ATMs nationwide.'
    },
    {
      id: 2,
      question: 'What are the current exchange rates?',
      answer: `Our current exchange rates are: 1 USD = ${currencyRate} GHS, 1 EUR = ${(currencyRate * 1.08).toFixed(2)} GHS, 1 GBP = ${(currencyRate * 1.27).toFixed(2)} GHS. Rates are updated daily.`
    },
    {
      id: 3,
      question: 'How do I activate mobile banking?',
      answer: 'To activate mobile banking, download our app from the App Store or Google Play Store, register with your account number and BVN, create a username and password, and complete the verification process.'
    },
    {
      id: 4,
      question: 'What are the requirements for opening an account?',
      answer: 'To open an account, you need a valid Ghana Card or passport, proof of address (utility bill), passport photograph, and minimum deposit of 50 GHS for savings accounts.'
    },
    {
      id: 5,
      question: 'How do I report a lost ATM card?',
      answer: 'Immediately call our 24/7 contact center at 0302-123-456 to report a lost card. You can also block your card through our mobile app under Card Management or visit any branch.'
    }
  ];

  // Handle scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Header animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const scrollPosition = chatContainerRef.current.scrollTop;
        if (scrollPosition > 50) {
          headerControls.start({ 
            height: '60px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: { duration: 0.3 }
          });
          searchControls.start({ 
            width: '200px',
            transition: { duration: 0.3 }
          });
        } else {
          headerControls.start({ 
            height: '80px', 
            boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
            transition: { duration: 0.3 }
          });
          searchControls.start({ 
            width: '300px',
            transition: { duration: 0.3 }
          });
        }
      }
    };

    const currentChatContainer = chatContainerRef.current;
    if (currentChatContainer) {
      currentChatContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentChatContainer) {
        currentChatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [headerControls, searchControls]);

  // Confetti effect hook
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  // Chat bot responses
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newUserMessage]);
    setMessageInput('');
    
    // Simulate typing indicator
    setTimeout(() => {
      let botResponse;
      const lowerCaseInput = messageInput.toLowerCase();
      
      if (lowerCaseInput.includes('balance') || lowerCaseInput.includes('account')) {
        botResponse = 'Your current account balance is GH₵ 12,456.78. Would you like to see your recent transactions?';
      } else if (lowerCaseInput.includes('loan') || lowerCaseInput.includes('borrow')) {
        botResponse = 'We offer personal loans with rates starting at 18% per annum. Would you like to apply or learn more about our loan products?';
      } else if (lowerCaseInput.includes('transfer') || lowerCaseInput.includes('send money')) {
        botResponse = 'You can transfer money through our mobile app, internet banking, or by visiting any branch. What method would you prefer?';
      } else if (lowerCaseInput.includes('branch') || lowerCaseInput.includes('location')) {
        botResponse = 'We have branches across Ghana. Please share your current location, and I can find the nearest branch for you.';
      } else if (lowerCaseInput.includes('card') || lowerCaseInput.includes('atm')) {
        botResponse = 'For card-related services, you can visit any branch or call our dedicated card services line at 0302-123-456. Would you like me to help you with a specific card issue?';
      } else if (lowerCaseInput.includes('exchange') || lowerCaseInput.includes('rate') || lowerCaseInput.includes('dollar')) {
        botResponse = `Today's exchange rate is 1 USD = GH₵ ${currencyRate.toFixed(2)}, 1 EUR = GH₵ ${(currencyRate * 1.08).toFixed(2)}, 1 GBP = GH₵ ${(currencyRate * 1.27).toFixed(2)}.`;
      } else if (lowerCaseInput.includes('thank')) {
        botResponse = 'You\'re welcome! Is there anything else I can assist you with today?';
      } else if (lowerCaseInput.includes('agent') || lowerCaseInput.includes('human') || lowerCaseInput.includes('representative')) {
        botResponse = 'I\'m connecting you with a customer service representative. Would you like to join a virtual queue or schedule a callback?';
        setShowSupportOptions(true);
      } else {
        botResponse = 'Thank you for your message. How else can I assist you with your banking needs today?';
      }
      
      const newBotMessage = {
        id: messages.length + 2,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };

  // Handle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Join virtual queue
  const handleJoinQueue = () => {
    setShowVirtualQueue(true);
    setShowSupportOptions(false);
    
    // Simulate queue position assignment
    setTimeout(() => {
      setQueuePosition(Math.floor(Math.random() * 5) + 1);
      setWaitTime(Math.floor(Math.random() * 10) + 5);
    }, 1500);
  };

  // Schedule a callback
  const handleScheduleCall = () => {
    setShowCallScheduler(true);
    setShowSupportOptions(false);
  };

  // Submit call schedule
  const handleSubmitSchedule = () => {
    if (selectedDate && selectedTime) {
      setShowCallScheduler(false);
      setShowConfetti(true);
      showNotification('Your call has been scheduled successfully!', 'success');
      
      // Add confirmation message to chat
      const confirmMessage = {
        id: messages.length + 1,
        sender: 'bot',
        text: `Great! I've scheduled a callback for you on ${selectedDate.display} at ${selectedTime}. Our representative will call you at your registered number.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, confirmMessage]);
    }
  };

  // Submit feedback
  const handleSubmitFeedback = () => {
    if (rating > 0) {
      setShowFeedbackForm(false);
      showNotification('Thank you for your feedback!', 'success');
      setShowConfetti(true);
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Render confetti
  const renderConfetti = () => {
    if (!showConfetti) return null;

    const confettiColors = ['#9333ea', '#a855f7', '#c084fc', '#e9d5ff', '#f5f3ff'];
    const confettiPieces = [];
    
    for (let i = 0; i < 100; i++) {
      const left = Math.random() * 100;
      const animDuration = 2 + Math.random() * 2;
      const size = 5 + Math.random() * 10;
      
      confettiPieces.push(
        <motion.div
          key={i}
          initial={{ y: -20, x: left + '%', opacity: 1 }}
          animate={{ y: '100vh', opacity: 0 }}
          transition={{ 
            duration: animDuration, 
            ease: [0.1, 0.3, 0.5, 1] 
          }}
          style={{
            position: 'fixed',
            top: 0,
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            width: size,
            height: size,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            zIndex: 100
          }}
        />
      );
    }
    
    return confettiPieces;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900">
      {/* Animated Header */}
      <motion.header 
        className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary-100 text-white flex items-center justify-between px-6"
        initial={{ height: '80px' }}
        animate={headerControls}
      >
        <div className="flex items-center space-x-3">
          <motion.div 
            className="h-10 w-10 rounded-full bg-white flex items-center justify-center"
            whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
          >
            <span className="text-primary text-lg font-bold">FAB</span>
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">First Atlantic Bank</h1>
            <p className="text-xs text-purple-200">Customer Support Center</p>
          </div>
        </div>
        <Link href="/tour" className=' text-white bg-primary px-6 py-4 rounded-full'>
        <p>Go back</p>
      </Link>
        <motion.div 
          className="bg-white/20 rounded-full p-2 flex items-center overflow-hidden backdrop-blur-sm"
          animate={searchControls}
          initial={{ width: '300px' }}
        >
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="bg-transparent border-none outline-none text-white placeholder-purple-200 w-full px-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-white text-purple-800 h-8 w-8 rounded-full flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
        </motion.div>
      </motion.header>

      {/* Tab Navigation */}
      <div className="bg-gray-800 text-white p-1 flex border-b border-gray-700">
        {['support', 'faq', 'branches', 'feedback'].map((tab) => (
          <motion.button
            key={tab}
            variants={tabVariants}
            initial="inactive"
            animate={activeTab === tab ? "active" : "inactive"}
            whileHover="hover"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 rounded-md font-medium ${
              activeTab === tab ? 'bg-primary text-white' : ''
            }`}
          >
            {tab === 'support' && (
              <div className="flex items-center justify-center space-x-2">
                <span>💬</span>
                <span>Support</span>
              </div>
            )}
            {tab === 'faq' && (
              <div className="flex items-center justify-center space-x-2">
                <span>❓</span>
                <span>FAQ</span>
              </div>
            )}
            {tab === 'branches' && (
              <div className="flex items-center justify-center space-x-2">
                <span>🏢</span>
                <span>Branches</span>
              </div>
            )}
            {tab === 'feedback' && (
              <div className="flex items-center justify-center space-x-2">
                <span>⭐</span>
                <span>Feedback</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Main Content Area */}
      <div 
        className="flex-1 overflow-y-auto p-6 relative" 
        ref={chatContainerRef}
      >
        {/* Confetti Effect */}
        {renderConfetti()}

        {/* Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-lg shadow-lg ${
                notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white`}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'support' && (
            <motion.div
              key="support"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-4xl mx-auto"
            >
              {!showChat ? (
                <>
                  <motion.div 
                    className="text-center mb-10"
                    variants={itemVariants}
                  >
                    <h2 className="text-3xl font-bold text-white mb-4">How can we help you today?</h2>
                    <p className="text-purple-200 max-w-2xl mx-auto">
                      Our customer support team is ready to assist you with any banking needs. Choose from the options below or start a chat with our virtual assistant.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    variants={contentVariants}
                  >
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                          transition: { type: 'spring', stiffness: 400, damping: 10 }
                        }}
                        className={`${service.color} rounded-2xl p-6 text-white cursor-pointer overflow-hidden relative`}
                      >
                        <div className="text-4xl mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-sm text-purple-100">Get help with your {service.title.toLowerCase()} needs</p>
                        
                        {/* Animated background effect */}
                        <motion.div 
                          className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white opacity-10"
                          initial={{ x: 0, y: 0 }}
                          animate={{ 
                            x: [0, 10, 0], 
                            y: [0, -10, 0],
                            scale: [1, 1.1, 1], 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 5,
                            ease: "easeInOut" 
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-800 rounded-2xl p-8 text-center relative overflow-hidden"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary opacity-10"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <h3 className="text-2xl font-bold text-white mb-4">Start Live Chat</h3>
                    <p className="text-gray-300 mb-6">
                      Get instant assistance from our virtual assistant or connect with a customer service representative.
                    </p>
                    <motion.button
                      onClick={() => setShowChat(true)}
                      className="bg-primary hover:bg-primary text-white py-3 px-8 rounded-full font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Chat Now
                    </motion.button>
                  </motion.div>
                </>
              ) : (
                <motion.div 
                  className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Chat Header */}
                  <div className="bg-primary p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-purple-800 font-bold text-md">
                          FAB
                        </div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-purple-800"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">First Atlantic Bank Support</h3>
                        <p className="text-xs text-purple-200">Online | Typically replies instantly</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowChat(false)}
                      className="text-white/80 hover:text-white"
                    >
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-6 bg-gradient-to-b from-gray-900 to-gray-800">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          variants={chatBubbleVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs sm:max-w-sm md:max-w-md rounded-2xl px-4 py-3 ${
                              message.sender === 'user' 
                                ? 'bg-primary text-white rounded-br-none' 
                                : 'bg-gray-700 text-white rounded-bl-none'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-purple-200' : 'text-gray-400'
                            }`}>
                              {message.time}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {/* Virtual Queue Component */}
                    <AnimatePresence>
                      {showVirtualQueue && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="bg-gray-700 rounded-xl p-4 my-4"
                        >
                          <h4 className="text-white font-bold mb-2">Virtual Queue Status</h4>
                          
                          {queuePosition ? (
                            <div className="text-center py-2">
                              <div className="mb-4">
                                <div className="text-white mb-1">Your position in queue:</div>
                                <div className="text-3xl font-bold text-purple-400">{queuePosition}</div>
                              </div>
                              
                              <div className="mb-4">
                                <div className="text-white mb-1">Estimated wait time:</div>
                                <div className="text-xl font-bold text-purple-300">{waitTime} minutes</div>
                              </div>
                              
                              <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                                <motion.div 
                                  className="bg-primary h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${100 - (queuePosition / 10) * 100}%` }}
                                  transition={{ duration: 1 }}
                                ></motion.div>
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm"
                                onClick={() => setShowVirtualQueue(false)}
                              >
                                Leave Queue
                              </motion.button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center py-4">
                              <motion.div
                                className="h-8 w-8 border-4 border-t-purple-500 border-purple-300/30 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span className="ml-3 text-purple-300">Finding the next available agent...</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Call Scheduler Component */}
                    <AnimatePresence>
                      {showCallScheduler && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="bg-gray-700 rounded-xl p-4 my-4"
                        >
                          <h4 className="text-white font-bold mb-2">Schedule a Callback</h4>
                          
                          <div className="mb-4">
                            <label className="block text-purple-200 text-sm mb-2">Select Date</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {availableDates.map((date) => (
                                <motion.button
                                  key={date.date}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => setSelectedDate(date)}
                                  className={`p-2 rounded-lg text-left text-sm ${
                                    selectedDate?.date === date.date
                                      ? 'bg-primary text-white'
                                      : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                  }`}
                                >
                                  {date.display}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <label className="block text-purple-200 text-sm mb-2">Select Time</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {availableTimes.map((time) => (
                                <motion.button
                                  key={time}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => setSelectedTime(time)}
                                  className={`p-2 rounded-lg text-center text-sm ${
                                    selectedTime === time
                                      ? 'bg-primary text-white'
                                      : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                                  }`}
                                >
                                  {time}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm flex-1"
                              onClick={() => setShowCallScheduler(false)}
                            >
                              Cancel
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`py-2 px-4 rounded-lg text-sm flex-1 ${
                                selectedDate && selectedTime
                                  ? 'bg-primary hover:bg-primary text-white'
                                  : 'bg-primary/50 text-white/70 cursor-not-allowed'
                              }`}
                              onClick={handleSubmitSchedule}
                              disabled={!selectedDate || !selectedTime}
                            >
                              Schedule Call
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Support Options */}
                    <AnimatePresence>
                      {showSupportOptions && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="bg-gray-700 rounded-xl p-4 my-4"
                        >
                          <h4 className="text-white font-bold mb-2">Connect with an Agent</h4>
                          <p className="text-gray-300 text-sm mb-4">Choose how you'd like to connect with our customer service team:</p>
                          
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-primary hover:bg-primary text-white py-2 px-4 rounded-lg text-sm flex-1"
                              onClick={handleJoinQueue}
                            >
                              Join Virtual Queue
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-primary hover:bg-primary text-white py-2 px-4 rounded-lg text-sm flex-1"
                              onClick={handleScheduleCall}
                            >
                              Schedule Callback
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-4 bg-gray-800 border-t border-gray-700">
                    <div className="flex space-x-2">
                      <motion.input
                        type="text"
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                      <motion.button
                        onClick={handleSendMessage}
                        className="bg-primary hover:bg-primary rounded-full w-10 h-10 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12l-6.5-7v4C7 9 4 12 3 16c2.5-3.5 5.5-4.5 10.5-4.5v4l6.5-7z" />
                        </svg>
                      </motion.button>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center">
                      Your messages are encrypted and secure
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-3xl mx-auto"
            >
              <motion.div 
                className="text-center mb-8"
                variants={itemVariants}
              >
                <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-purple-200 max-w-2xl mx-auto">
                  Find quick answers to common questions about our banking services, accounts, and policies.
                </p>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                variants={contentVariants}
              >
                {faqItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="bg-gray-800 rounded-xl overflow-hidden"
                  >
                    <motion.button
                      className="w-full p-5 text-left flex justify-between items-center text-white"
                      onClick={() => toggleFaq(item.id)}
                      whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                    >
                      <span className="font-medium text-lg">{item.question}</span>
                      <motion.div
                        animate={{ rotate: expandedFaq === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-purple-400">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {expandedFaq === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-gray-300 border-t border-gray-700">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-10 bg-primary/30 rounded-xl p-6 border border-purple-800/50"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-white mb-4">Can't find what you're looking for?</h3>
                <p className="text-purple-200 mb-4">
                  Our customer support team is ready to assist you with any other questions you might have.
                </p>
                <motion.button
                  onClick={() => {
                    setActiveTab('support');
                    setShowChat(true);
                  }}
                  className="bg-primary hover:bg-primary text-white py-2 px-5 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Chat with Support
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* Branches Tab */}
          {activeTab === 'branches' && (
            <motion.div
              key="branches"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-4xl mx-auto"
            >
              <motion.div 
                className="text-center mb-8"
                variants={itemVariants}
              >
                <h2 className="text-3xl font-bold text-white mb-4">Our Branch Locations</h2>
                <p className="text-purple-200 max-w-2xl mx-auto">
                  Visit one of our branches across Ghana for in-person banking services and support.
                </p>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={contentVariants}
              >
                {branchLocations.map((branch) => (
                  <motion.div
                    key={branch.id}
                    variants={itemVariants}
                    className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow"
                    whileHover={{ 
                      y: -5, 
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{branch.name}</h3>
                        <p className="text-gray-300 mb-4">{branch.address}</p>
                        
                        <div className="flex items-center space-x-2 text-purple-300 mb-2">
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4v4m0 0l-8 8m8-8H4m12 2v6a4 4 0 01-4 4H4" />
                          </svg>
                          <span>{branch.phone}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-purple-300">
                          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{branch.hours}</span>
                        </div>
                      </div>
                      
                      <motion.div
                        className="w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                      >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-5.447a7 7 0 1 1 11.31-2.224" />
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-700 flex space-x-3">
                      <motion.button
                        className="flex-1 bg-primary/30 hover:bg-primary/50 text-purple-300 rounded-lg py-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Get Directions
                      </motion.button>
                      
                      <motion.button
                        className="flex-1 bg-primary/30 hover:bg-primary/50 text-purple-300 rounded-lg py-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Book Appointment
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-10 bg-gray-800 rounded-xl overflow-hidden"
                variants={itemVariants}
              >
                <div className="bg-primary/30 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Branch Banking Hours</h3>
                  <p className="text-purple-200">
                    Our standard banking hours across all branches:
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Monday - Friday</span>
                      <span className="text-purple-300">8:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Saturday</span>
                      <span className="text-purple-300">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Sunday</span>
                      <span className="text-purple-300">Closed</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white">Public Holidays</span>
                      <span className="text-purple-300">Closed</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-yellow-400">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-2">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                      <span className="text-sm">Some branches may have special hours during holidays and festivals.</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-3xl mx-auto"
            >
              {!showFeedbackForm ? (
                <>
                  <motion.div 
                    className="text-center mb-10"
                    variants={itemVariants}
                  >
                    <h2 className="text-3xl font-bold text-white mb-4">Share Your Feedback</h2>
                    <p className="text-purple-200 max-w-2xl mx-auto">
                      We value your opinion and are committed to continuously improving our services based on your feedback.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
                    variants={contentVariants}
                  >
                    <motion.div 
                      className="bg-gray-800 rounded-xl p-6"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
                          ⭐
                        </div>
                        <h3 className="text-xl font-bold text-white">Rate Our Service</h3>
                      </div>
                      <p className="text-gray-300 mb-6">
                        Let us know about your recent experience with our bank services.
                      </p>
                      <motion.button
                        onClick={() => setShowFeedbackForm(true)}
                        className="bg-primary hover:bg-primary text-white py-3 px-6 rounded-lg font-medium w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Give Feedback
                      </motion.button>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gray-800 rounded-xl p-6"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-xl">
                          🎁
                        </div>
                        <h3 className="text-xl font-bold text-white">Suggest Improvements</h3>
                      </div>
                      <p className="text-gray-300 mb-6">
                        Have ideas on how we can serve you better? We'd love to hear them.
                      </p>
                      <motion.button
                        onClick={() => {
                          setActiveTab('support');
                          setShowChat(true);
                        }}
                        className="bg-primary hover:bg-primary text-white py-3 px-6 rounded-lg font-medium w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Send Suggestions
                      </motion.button>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-primary/30 rounded-xl p-6 border border-purple-800/50"
                    variants={itemVariants}
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Your Opinion Matters</h3>
                    <p className="text-purple-200 mb-4">
                      At First Atlantic Bank, we're committed to providing exceptional service. Your feedback helps us understand what we're doing right and where we can improve.
                    </p>
                    <div className="flex items-center space-x-2 text-yellow-300 text-sm">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>Your feedback is reviewed by our management team and used to enhance our services.</span>
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div 
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  variants={contentVariants}
                >
                  <div className="bg-primary p-5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">Feedback Form</h3>
                      <motion.button
                        onClick={() => setShowFeedbackForm(false)}
                        className="text-white/80 hover:text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <label className="block text-white font-medium mb-2">How would you rate our service?</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9, rotate: 15 }}
                            className="text-3xl"
                          >
                            {(hoverRating || rating) >= star ? '⭐' : '☆'}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-white font-medium mb-2">Share your experience</label>
                      <motion.textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={5}
                        placeholder="Tell us about your experience with our services..."
                        whileFocus={{ scale: 1.01 }}
                      ></motion.textarea>
                    </div>
                    
                    <div className="flex space-x-4">
                      <motion.button
                        onClick={() => setShowFeedbackForm(false)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        Cancel
                      </motion.button>
                      
                      <motion.button
                        onClick={handleSubmitFeedback}
                        className={`flex-1 py-3 rounded-lg font-medium ${
                          rating > 0 
                            ? 'bg-purple-600 hover:bg-primary text-white' 
                            : 'bg-purple-600/50 text-white/70 cursor-not-allowed'
                        }`}
                        whileHover={rating > 0 ? { scale: 1.03 } : {}}
                        whileTap={rating > 0 ? { scale: 0.97 } : {}}
                        disabled={rating === 0}
                      >
                        Submit Feedback
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-gray-400 text-sm p-6 text-center border-t border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center mb-4 space-x-6">
            <motion.a href="#" className="hover:text-purple-400" whileHover={{ y: -2 }}>Privacy Policy</motion.a>
            <motion.a href="#" className="hover:text-purple-400" whileHover={{ y: -2 }}>Terms of Service</motion.a>
            <motion.a href="#" className="hover:text-purple-400" whileHover={{ y: -2 }}>Security</motion.a>
            <motion.a href="#" className="hover:text-purple-400" whileHover={{ y: -2 }}>Careers</motion.a>
          </div>
          <p>© 2025 First Atlantic Bank. All rights reserved.</p>
          <p className="mt-1">Licensed by Central Bank of Ghana</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default CustomerServicePage;