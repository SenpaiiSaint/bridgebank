'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TransactionList from './TransactionList';
import LoanCard from './LoanCard';
import AccountCard from './AccountCard';

interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
}

interface Loan {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

interface Account {
  id: string;
  balance: number;
  type: string;
}

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'loans' | 'accounts'>('transactions');

  const transactions: Transaction[] = [
    {
      id: '1',
      amount: 1000,
      type: 'credit',
      description: 'Donation from John Doe',
      date: '2024-04-21',
    },
    // Add more transactions as needed
  ];

  const loans: Loan[] = [
    {
      id: '1',
      amount: 5000,
      status: 'pending',
      date: '2024-04-21',
    },
    // Add more loans as needed
  ];

  const accounts: Account[] = [
    {
      id: '1',
      balance: 10000,
      type: 'Main Account',
    },
    // Add more accounts as needed
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
      >
        NGO Dashboard
      </motion.h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
        {(['transactions', 'loans', 'accounts'] as const).map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-6"
      >
        {activeTab === 'transactions' && (
          <TransactionList transactions={transactions} />
        )}
        {activeTab === 'loans' && (
          <div className="grid gap-6">
            {loans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        )}
        {activeTab === 'accounts' && (
          <div className="grid gap-6">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
} 