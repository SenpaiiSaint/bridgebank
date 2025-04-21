'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { io } from 'socket.io-client';

interface Transaction {
  id: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  timestamp: string;
  description: string;
}

export default function TransactionMonitor() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch initial transactions
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();

    // Set up WebSocket connection
    const socket = io({
      path: '/api/ws',
      addTrailingSlash: false,
    });

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('WebSocket Connected');
    });

    socket.on('transaction', (newTransaction: Transaction) => {
      setTransactions(prev => [newTransaction, ...prev].slice(0, 10));
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('WebSocket Disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [session]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Real-time Transactions</h3>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-500">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {transactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <span className={`text-lg ${
                    transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'CREDIT' ? '+' : '-'}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${transaction.amount.toFixed(2)}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                  transaction.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 