"use client"

import { useEffect, useState } from 'react';
import AccountCard from './AccountCard';
import LoanCard from './LoanCard';
import TransactionList from './TransactionList';

export default function NGODashboard() {
  const [accounts, setAccounts] = useState([]);
  const [loans, setLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchAccounts();
    fetchLoans();
    fetchTransactions();
  }, []);

  const fetchAccounts = async () => {
    const res = await fetch('/api/accounts');
    const data = await res.json();
    setAccounts(data);
  };

  const fetchLoans = async () => {
    const res = await fetch('/api/loans');
    const data = await res.json();
    setLoans(data);
  };

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Accounts</h2>
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Loans</h2>
        {loans.map((loan) => (
          <LoanCard key={loan.id} loan={loan} />
        ))}
      </section>
      <section>
        <TransactionList transactions={transactions} />
      </section>
    </div>
  );
}
