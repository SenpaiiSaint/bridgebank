'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import TransactionMonitor from '../components/TransactionMonitor';
import FinancialDashboard from '../components/FinancialDashboard';
import PageNav from '../components/PageNav';

// Demo data
const demoTransactions = [
  { id: 1, type: 'Donation', amount: 5000, date: '2024-03-15', status: 'Completed', donor: 'Global Health Foundation', category: 'Healthcare' },
  { id: 2, type: 'Expense', amount: 2500, date: '2024-03-14', status: 'Completed', recipient: 'Medical Supplies Inc.', category: 'Medical' },
  { id: 3, type: 'Donation', amount: 10000, date: '2024-03-13', status: 'Pending', donor: 'Education for All', category: 'Education' },
  { id: 4, type: 'Expense', amount: 3000, date: '2024-03-12', status: 'Completed', recipient: 'Local School Program', category: 'Education' },
];

const demoStats = {
  totalBalance: 15000,
  monthlyTransactions: 156,
  activeServices: 8,
  beneficiaries: 2500,
  projects: 12,
  volunteers: 45
};

const demoProjects = [
  { id: 1, name: 'Clean Water Initiative', progress: 75, target: 50000, raised: 37500, location: 'Rural Kenya', category: 'Infrastructure' },
  { id: 2, name: 'Education Support', progress: 45, target: 30000, raised: 13500, location: 'Urban India', category: 'Education' },
  { id: 3, name: 'Healthcare Access', progress: 90, target: 40000, raised: 36000, location: 'Sub-Saharan Africa', category: 'Healthcare' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState(demoTransactions);
  const [stats, setStats] = useState(demoStats);
  const [projects, setProjects] = useState(demoProjects);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(5000);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const notificationTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        const isDonation = Math.random() > 0.3;
        const newTransaction = {
          id: transactions.length + 1,
          type: isDonation ? 'Donation' : 'Expense',
          amount: Math.floor(Math.random() * 10000) + 1000,
          date: new Date().toISOString().split('T')[0],
          status: 'Completed',
          category: isDonation ? 'Donation' : 'Expense',
          ...(isDonation 
            ? { donor: `Donor ${Math.floor(Math.random() * 1000)}` }
            : { recipient: `Recipient ${Math.floor(Math.random() * 1000)}` }
          )
        };
        
        setTransactions(prev => [newTransaction, ...prev].slice(0, 10));
        
        setStats(prev => ({
          ...prev,
          totalBalance: prev.totalBalance + (isDonation ? newTransaction.amount : -newTransaction.amount),
          monthlyTransactions: prev.monthlyTransactions + 1,
          beneficiaries: prev.beneficiaries + (isDonation ? Math.floor(Math.random() * 10) : 0)
        }));

        // Add notification
        const newNotification: Notification = {
          id: Date.now(),
          type: isDonation ? 'success' : 'info',
          message: `${isDonation ? 'New donation' : 'New expense'} of $${newTransaction.amount.toLocaleString()}`,
          timestamp: new Date()
        };
        setNotifications(prev => [newNotification, ...prev].slice(0, 5));
        setShowNotification(true);

        // Update random project progress
        setProjects(prev => prev.map(project => 
          Math.random() > 0.7 
            ? { ...project, raised: Math.min(project.target, project.raised + Math.floor(Math.random() * 1000)) }
            : project
        ));
      }, simulationSpeed);

      return () => clearInterval(interval);
    }
  }, [isSimulating, simulationSpeed, transactions.length]);

  useEffect(() => {
    if (showNotification) {
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
      }
      notificationTimeout.current = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [showNotification]);

  const transactionData = transactions.map(t => ({
    date: t.date,
    amount: t.type === 'Donation' ? t.amount : -t.amount
  }));

  const categoryData = [
    { name: 'Healthcare', value: transactions.filter(t => t.category === 'Healthcare').length },
    { name: 'Education', value: transactions.filter(t => t.category === 'Education').length },
    { name: 'Infrastructure', value: transactions.filter(t => t.category === 'Infrastructure').length },
    { name: 'Medical', value: transactions.filter(t => t.category === 'Medical').length },
    { name: 'Other', value: transactions.filter(t => !['Healthcare', 'Education', 'Infrastructure', 'Medical'].includes(t.category)).length }
  ];

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
                  NGO Dashboard
                </h1>
                <p className="text-gray-600 mt-2">Real-time financial overview and project tracking</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsSimulating(!isSimulating)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isSimulating
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSimulating ? 'Stop Demo' : 'Start Demo'}
                  </button>
                  {isSimulating && (
                    <select
                      value={simulationSpeed}
                      onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                      className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1000}>Fast (1s)</option>
                      <option value={3000}>Medium (3s)</option>
                      <option value={5000}>Slow (5s)</option>
                    </select>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleString()}
                </span>
              </div>
            </motion.div>

            {/* Notifications */}
            <AnimatePresence>
              {showNotification && notifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-4 right-4 z-50"
                >
                  <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notifications[0].type === 'success' ? 'bg-green-500' :
                        notifications[0].type === 'warning' ? 'bg-yellow-500' :
                        notifications[0].type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{notifications[0].message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notifications[0].timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: "Total Balance", value: `$${stats.totalBalance.toLocaleString()}`, change: "+2.5%" },
                { title: "Monthly Transactions", value: stats.monthlyTransactions, change: "+12%" },
                { title: "Active Projects", value: stats.projects, change: "0%" },
                { title: "Beneficiaries", value: stats.beneficiaries.toLocaleString(), change: "+5%" },
                { title: "Volunteers", value: stats.volunteers, change: "+3%" },
                { title: "Active Services", value: stats.activeServices, change: "0%" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer"
                >
                  <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`ml-2 text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction Categories</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Projects Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.01 }}
                    className={`space-y-2 p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedProject === project.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProject(project.id === selectedProject ? null : project.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-500">{project.location} • {project.category}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        ${project.raised.toLocaleString()} / ${project.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <motion.div
                        className="bg-blue-600 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                    {selectedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-sm text-gray-600"
                      >
                        <p>Project Details:</p>
                        <ul className="list-disc list-inside mt-1">
                          <li>Category: {project.category}</li>
                          <li>Location: {project.location}</li>
                          <li>Progress: {project.progress}%</li>
                          <li>Remaining Target: ${(project.target - project.raised).toLocaleString()}</li>
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Details</th>
                      <th className="pb-4">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-t"
                      >
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            transaction.type === 'Donation' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="py-4">${transaction.amount.toLocaleString()}</td>
                        <td className="py-4">{transaction.date}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            transaction.status === 'Completed' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="py-4 text-gray-600">
                          {transaction.type === 'Donation' 
                            ? `From: ${transaction.donor}`
                            : `To: ${transaction.recipient}`
                          }
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                            {transaction.category}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 