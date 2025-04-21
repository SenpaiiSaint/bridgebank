'use client';

import { motion } from 'framer-motion';

interface Loan {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

interface LoanCardProps {
  loan: Loan;
}

export default function LoanCard({ loan }: LoanCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Loan Application</p>
          <p className="text-sm text-gray-500">{loan.date}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold">${loan.amount}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[loan.status]}`}
          >
            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
} 