'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  type: 'incoming' | 'outgoing';
  timestamp: string;
}

export default function SMSUSSDSimulator() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to UnBanked! Type HELP for available commands.',
      type: 'incoming',
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      type: 'outgoing',
      timestamp: new Date().toISOString(),
    };

    // Add system response
    const systemResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getResponse(input),
      type: 'incoming',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, userMessage, systemResponse]);
    setInput('');
  };

  const getResponse = (input: string): string => {
    const command = input.toLowerCase().trim();
    switch (command) {
      case 'help':
        return 'Available commands:\n1. BALANCE - Check account balance\n2. SEND <amount> <number> - Send money\n3. LOAN - Apply for a loan\n4. HELP - Show this help message';
      case 'balance':
        return 'Your current balance is $1,000.00';
      case 'loan':
        return 'To apply for a loan, please visit your nearest NGO office.';
      default:
        return 'Invalid command. Type HELP for available commands.';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
      >
        SMS/USSD Simulator
      </motion.h2>
      
      {/* Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-2xl p-4 h-[500px] overflow-y-auto mb-6 shadow-inner"
      >
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`mb-4 ${
              message.type === 'outgoing' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                message.type === 'outgoing'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="whitespace-pre-line text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Input */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
          className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
        >
          Send
        </motion.button>
      </motion.form>
    </div>
  );
} 