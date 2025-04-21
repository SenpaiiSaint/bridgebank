'use client';

import { motion } from 'framer-motion';

interface Account {
  id: string;
  balance: number;
  type: 'savings' | 'current';
  lastUpdated: string;
}

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const accountTypeColors = {
    savings: 'bg-blue-100 text-blue-800',
    current: 'bg-purple-100 text-purple-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Account Balance</p>
          <p className="text-sm text-gray-500">Last updated: {account.lastUpdated}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold">${account.balance}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${accountTypeColors[account.type]}`}
          >
            {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
} 