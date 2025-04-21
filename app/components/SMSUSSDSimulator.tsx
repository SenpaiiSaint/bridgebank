'use client';

import { useState, useRef, useEffect } from 'react';
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
      text: 'Welcome to FinLink Banking Services. For available services, type HELP.',
      type: 'incoming',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: input,
        type: 'outgoing',
        timestamp: new Date().toISOString(),
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Add system response
      const systemResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(input),
        type: 'incoming',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, userMessage, systemResponse]);
      setInput('');
    } catch (err) {
      setError('Oops! Something went wrong. Please try again.');
      console.error('Error processing message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getResponse = (input: string): string => {
    const command = input.toLowerCase().trim();
    try {
      switch (command) {
        case 'help':
          return 'Available Services:\n1. BALANCE - Check account balance\n2. SEND <amount> <number> - Transfer money\n3. AIRTIME - Buy airtime\n4. HELP - Show this menu';
        case 'balance':
          return 'Your account balance is $10,000,000.00';
        case 'airtime':
          return 'Enter amount and phone number to purchase airtime.';
        default:
          return 'Invalid service code. Type HELP for available services.';
      }
    } catch (err) {
      console.error('Error generating response:', err);
      return 'Service temporarily unavailable. Please try again later.';
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
      
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </motion.div>
      )}
      
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
        <div ref={messagesEndRef} />
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
          disabled={isLoading}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </div>
          ) : (
            'Send'
          )}
        </motion.button>
      </motion.form>
    </div>
  );
} 