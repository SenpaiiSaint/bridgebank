'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import PageNav from '../components/PageNav';

interface USSDState {
  menu: string;
  balance: number;
  lastTransaction: string;
}

interface NetworkSignal {
  strength: number;
  isConnecting: boolean;
}

export default function USSD() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [state, setState] = useState<USSDState>({
    menu: 'main',
    balance: 1500,
    lastTransaction: ''
  });
  const [networkSignal, setNetworkSignal] = useState<NetworkSignal>({
    strength: 4,
    isConnecting: false
  });
  const [isTyping, setIsTyping] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);

  useEffect(() => {
    // Simulate network signal changes
    const interval = setInterval(() => {
      setNetworkSignal(prev => ({
        ...prev,
        strength: Math.min(5, Math.max(1, prev.strength + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 100);
  };

  const handleKeypadInput = (value: string) => {
    setInput(prev => prev + value);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    setNetworkSignal(prev => ({ ...prev, isConnecting: true }));
    
    setTimeout(() => {
      const response = simulateUSSDResponse(input);
      setOutput(prev => [...prev, `> ${input}`, ...response]);
      setInput('');
      setNetworkSignal(prev => ({ ...prev, isConnecting: false }));
    }, 1000);
  };

  const simulateUSSDResponse = (input: string): string[] => {
    const cmd = input.toLowerCase();
    
    switch (state.menu) {
      case 'main':
        switch (cmd) {
          case '1':
            setState(prev => ({ ...prev, menu: 'balance' }));
            return ['Your balance is: $' + state.balance.toFixed(2)];
          case '2':
            setState(prev => ({ ...prev, menu: 'send_money' }));
            return ['Enter recipient number:'];
          case '3':
            setState(prev => ({ ...prev, menu: 'airtime' }));
            return ['Enter amount:'];
          case '4':
            setState(prev => ({ ...prev, menu: 'bills' }));
            return ['Select bill type:\n1. Electricity\n2. Water\n3. Internet'];
          case '0':
            return ['Thank you for using UnBanked USSD'];
          default:
            return ['Invalid input. Please try again.'];
        }
      case 'send_money':
        if (cmd === '0') {
          setState(prev => ({ ...prev, menu: 'main' }));
          return ['Returning to main menu...'];
        }
        setState(prev => ({ ...prev, menu: 'send_amount' }));
        return ['Enter amount to send:'];
      case 'send_amount':
        const amount = parseFloat(cmd);
        if (isNaN(amount) || amount <= 0) {
          return ['Invalid amount. Please try again.'];
        }
        if (amount > state.balance) {
          return ['Insufficient balance. Please try again.'];
        }
        setState(prev => ({
          ...prev,
          menu: 'main',
          balance: prev.balance - amount,
          lastTransaction: `Sent $${amount.toFixed(2)}`
        }));
        return [`Transaction successful!\nNew balance: $${(state.balance - amount).toFixed(2)}`];
      case 'airtime':
        const airtimeAmount = parseFloat(cmd);
        if (isNaN(airtimeAmount) || airtimeAmount <= 0) {
          return ['Invalid amount. Please try again.'];
        }
        if (airtimeAmount > state.balance) {
          return ['Insufficient balance. Please try again.'];
        }
        setState(prev => ({
          ...prev,
          menu: 'main',
          balance: prev.balance - airtimeAmount,
          lastTransaction: `Bought $${airtimeAmount.toFixed(2)} airtime`
        }));
        return [`Airtime purchase successful!\nNew balance: $${(state.balance - airtimeAmount).toFixed(2)}`];
      case 'bills':
        switch (cmd) {
          case '1':
            setState(prev => ({ ...prev, menu: 'electricity' }));
            return ['Enter meter number:'];
          case '2':
            setState(prev => ({ ...prev, menu: 'water' }));
            return ['Enter account number:'];
          case '3':
            setState(prev => ({ ...prev, menu: 'internet' }));
            return ['Enter account number:'];
          case '0':
            setState(prev => ({ ...prev, menu: 'main' }));
            return ['Returning to main menu...'];
          default:
            return ['Invalid input. Please try again.'];
        }
      default:
        if (cmd === '0') {
          setState(prev => ({ ...prev, menu: 'main' }));
          return ['Returning to main menu...'];
        }
        return ['Invalid input. Please try again.'];
    }
  };

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    const outputContainer = document.getElementById('ussd-output');
    if (outputContainer) {
      outputContainer.scrollTop = outputContainer.scrollHeight;
    }
  }, [output]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNav />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  USSD Simulation
                </h1>
                <p className="text-gray-600 mt-2">Experience our USSD banking service in a simulated environment</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500">
                    Network: 
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-3 rounded-sm ${
                            i < networkSignal.strength
                              ? networkSignal.isConnecting
                                ? 'bg-yellow-500 animate-pulse'
                                : 'bg-green-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Current Menu: {state.menu.replace('_', ' ').toUpperCase()}
                </div>
              </div>
            </motion.div>

            {/* USSD Interface */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900 rounded-2xl shadow-lg p-6 min-h-[400px]"
            >
              <div className="h-full flex flex-col">
                {/* USSD Output */}
                <div 
                  id="ussd-output"
                  className="flex-1 overflow-y-auto mb-4 font-mono text-green-400 space-y-1"
                >
                  <AnimatePresence mode="popLayout">
                    {output.length === 0 ? (
                      <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-gray-500"
                      >
                        Welcome to UnBanked USSD Service
                        <br />
                        <br />
                        1. Check Balance
                        <br />
                        2. Send Money
                        <br />
                        3. Buy Airtime
                        <br />
                        4. Pay Bills
                        <br />
                        0. Exit
                      </motion.div>
                    ) : (
                      output.map((line, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {line}
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>

                {/* USSD Input */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={handleInput}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter USSD command..."
                    />
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-2 top-2 text-gray-400"
                      >
                        |
                      </motion.div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </form>

                {/* Virtual Keypad */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowKeypad(!showKeypad)}
                    className="text-sm text-gray-400 hover:text-gray-300"
                  >
                    {showKeypad ? 'Hide Keypad' : 'Show Keypad'}
                  </button>
                  <AnimatePresence>
                    {showKeypad && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 grid grid-cols-3 gap-2"
                      >
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                          <motion.button
                            key={key}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleKeypadInput(key)}
                            className="bg-gray-800 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            {key}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Quick Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Commands</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 1 - Check Balance</li>
                  <li>• 2 - Send Money</li>
                  <li>• 3 - Buy Airtime</li>
                  <li>• 4 - Pay Bills</li>
                  <li>• 0 - Back/Exit</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Real-time balance updates</li>
                  <li>• Transaction history</li>
                  <li>• Multiple menu levels</li>
                  <li>• Error handling</li>
                  <li>• Auto-scrolling output</li>
                  <li>• Network signal simulation</li>
                  <li>• Animated transitions</li>
                  <li>• Virtual keypad</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 