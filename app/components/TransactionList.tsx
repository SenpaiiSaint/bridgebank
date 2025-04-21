'use client';

import { motion } from 'framer-motion';

interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
            <span
              className={`font-bold ${
                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 