'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import TransactionMonitor from '../components/TransactionMonitor';
import FinancialDashboard from '../components/FinancialDashboard';
import PageNav from '../components/PageNav';

// Enhanced demo data with more defined values
const demoTransactions = [
  { 
    id: 1, 
    type: 'Donation', 
    amount: 5000, 
    date: '2024-03-15', 
    status: 'Completed', 
    donor: 'Global Health Foundation',
    category: 'Healthcare',
    project: 'Rural Health Initiative',
    paymentMethod: 'Bank Transfer',
    reference: 'GHF-2024-001',
    currency: 'USD',
    impact: 'Healthcare access for 500 people',
    notes: 'Annual grant for medical supplies'
  },
  { 
    id: 2, 
    type: 'Expense', 
    amount: 2500, 
    date: '2024-03-14', 
    status: 'Completed', 
    recipient: 'Medical Supplies Inc.',
    category: 'Medical',
    project: 'Rural Health Initiative',
    paymentMethod: 'Mobile Money',
    reference: 'MSI-2024-002',
    currency: 'USD',
    impact: 'Medical supplies delivered',
    notes: 'Emergency medical equipment purchase'
  },
  { 
    id: 3, 
    type: 'Donation', 
    amount: 10000, 
    date: '2024-03-13', 
    status: 'Pending', 
    donor: 'Education for All',
    category: 'Education',
    project: 'Digital Learning Program',
    paymentMethod: 'International Wire',
    reference: 'EFA-2024-003',
    currency: 'USD',
    impact: 'Digital education for 200 students',
    notes: 'Technology infrastructure funding'
  },
  { 
    id: 4, 
    type: 'Expense', 
    amount: 3000, 
    date: '2024-03-12', 
    status: 'Completed', 
    recipient: 'Local School Program',
    category: 'Education',
    project: 'Digital Learning Program',
    paymentMethod: 'Mobile Money',
    reference: 'LSP-2024-004',
    currency: 'USD',
    impact: 'School supplies distributed',
    notes: 'Educational materials purchase'
  },
  { 
    id: 5, 
    type: 'Donation', 
    amount: 7500, 
    date: '2024-03-11', 
    status: 'Completed', 
    donor: 'Water for Life',
    category: 'Infrastructure',
    project: 'Clean Water Initiative',
    paymentMethod: 'Bank Transfer',
    reference: 'WFL-2024-005',
    currency: 'USD',
    impact: 'Water access for 3 villages',
    notes: 'Water purification system funding'
  }
];

const demoStats = {
  totalBalance: 15000,
  monthlyTransactions: 156,
  activeServices: 8,
  beneficiaries: 2500,
  projects: 12,
  volunteers: 45,
  fundingUtilization: 78,
  donorRetention: 92,
  programEfficiency: 85,
  totalDonations: 250000,
  totalExpenses: 235000,
  averageDonation: 5000,
  successRate: 95,
  communityImpact: 89,
  sustainabilityScore: 87
};

const demoProjects = [
  { 
    id: 1, 
    name: 'Clean Water Initiative', 
    progress: 75, 
    target: 50000, 
    raised: 37500, 
    location: 'Rural Kenya', 
    category: 'Infrastructure',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    status: 'Active',
    impactMetrics: {
      householdsReached: 1200,
      waterPointsInstalled: 15,
      healthImprovement: 45,
      communityEngagement: 90,
      sustainabilityScore: 85
    },
    team: {
      projectManager: 'Sarah Johnson',
      fieldCoordinator: 'Michael Ochieng',
      volunteers: 12
    },
    milestones: [
      { date: '2024-02-15', description: 'Initial assessment completed', status: 'Completed' },
      { date: '2024-04-15', description: 'First water point installation', status: 'In Progress' },
      { date: '2024-08-15', description: 'Community training program', status: 'Pending' }
    ]
  },
  { 
    id: 2, 
    name: 'Education Support Program', 
    progress: 45, 
    target: 30000, 
    raised: 13500, 
    location: 'Urban India', 
    category: 'Education',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    status: 'Active',
    impactMetrics: {
      studentsEnrolled: 850,
      schoolsSupported: 8,
      literacyImprovement: 30,
      teacherTraining: 45,
      digitalAdoption: 60
    },
    team: {
      projectManager: 'Rajesh Kumar',
      fieldCoordinator: 'Priya Sharma',
      volunteers: 15
    },
    milestones: [
      { date: '2024-03-01', description: 'Curriculum development', status: 'Completed' },
      { date: '2024-05-01', description: 'Teacher training program', status: 'In Progress' },
      { date: '2024-09-01', description: 'Digital learning implementation', status: 'Pending' }
    ]
  },
  { 
    id: 3, 
    name: 'Healthcare Access Initiative', 
    progress: 90, 
    target: 40000, 
    raised: 36000, 
    location: 'Sub-Saharan Africa', 
    category: 'Healthcare',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    impactMetrics: {
      patientsServed: 2500,
      clinicsSupported: 12,
      healthOutcomes: 60,
      vaccinationRate: 85,
      maternalHealth: 75
    },
    team: {
      projectManager: 'Dr. Amina Bello',
      fieldCoordinator: 'James Okonkwo',
      volunteers: 18
    },
    milestones: [
      { date: '2024-02-01', description: 'Medical supplies distribution', status: 'Completed' },
      { date: '2024-06-01', description: 'Mobile clinic deployment', status: 'In Progress' },
      { date: '2024-10-01', description: 'Health education program', status: 'Pending' }
    ]
  }
];

// Additional data for visualizations
const monthlyData = [
  { month: 'Jan', donations: 45000, expenses: 42000, beneficiaries: 1200 },
  { month: 'Feb', donations: 52000, expenses: 48000, beneficiaries: 1500 },
  { month: 'Mar', donations: 48000, expenses: 45000, beneficiaries: 1300 },
  { month: 'Apr', donations: 55000, expenses: 52000, beneficiaries: 1700 },
  { month: 'May', donations: 60000, expenses: 58000, beneficiaries: 2000 },
  { month: 'Jun', donations: 65000, expenses: 62000, beneficiaries: 2200 }
];

const categoryDistribution = [
  { name: 'Healthcare', value: 35, color: '#FF6B6B' },
  { name: 'Education', value: 25, color: '#4ECDC4' },
  { name: 'Infrastructure', value: 20, color: '#45B7D1' },
  { name: 'Emergency Relief', value: 15, color: '#96CEB4' },
  { name: 'Other', value: 5, color: '#FFEEAD' }
];

const impactMetrics = [
  { category: 'Healthcare', metrics: [
    { name: 'Patients Served', value: 2500, target: 3000 },
    { name: 'Clinics Supported', value: 12, target: 15 },
    { name: 'Health Outcomes', value: 60, target: 75 }
  ]},
  { category: 'Education', metrics: [
    { name: 'Students Enrolled', value: 850, target: 1000 },
    { name: 'Schools Supported', value: 8, target: 10 },
    { name: 'Literacy Improvement', value: 30, target: 40 }
  ]},
  { category: 'Infrastructure', metrics: [
    { name: 'Households Reached', value: 1200, target: 1500 },
    { name: 'Water Points Installed', value: 15, target: 20 },
    { name: 'Health Improvement', value: 45, target: 60 }
  ]}
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

// Dashboard Component Documentation
// This component implements a comprehensive NGO financial management dashboard
// with real-time data visualization and simulation capabilities.

// Data Structures
// - demoTransactions: Sample transaction data with detailed financial records
// - demoStats: Key performance indicators and metrics
// - demoProjects: Project information with impact metrics and timelines
// - monthlyData: Historical performance data for visualization
// - categoryDistribution: Funding allocation across different sectors
// - impactMetrics: Measurable outcomes for each project category

// Component Features:
// 1. Real-time Data Simulation
//    - Toggle simulation with variable speed control
//    - Automatic transaction generation
//    - Dynamic metric updates
// 2. Data Visualization
//    - Monthly performance trends
//    - Category distribution charts
//    - Impact metric progress tracking
// 3. Project Management
//    - Detailed project information
//    - Team and milestone tracking
//    - Progress visualization

// Simulation Control Section
const SPEED_OPTIONS = [
  { value: 1000, label: 'Fast (1s)' },
  { value: 5000, label: 'Medium (5s)' },
  { value: 8000, label: 'Slow (8s)' },
  { value: 10000, label: 'Very Slow (10s)' }
];

// Transaction Generation Logic
const generateTransaction = (currentTransactions: typeof demoTransactions, isDonation: boolean) => ({
  id: currentTransactions.length + 1,
  type: isDonation ? 'Donation' : 'Expense',
  amount: Math.floor(Math.random() * 10000) + 1000,
  date: new Date().toISOString().split('T')[0],
  status: 'Completed',
  category: isDonation ? 'Donation' : 'Expense',
  project: 'Demo Project',
  paymentMethod: isDonation ? 'Bank Transfer' : 'Mobile Money',
  reference: `DEMO-${Date.now()}`,
  currency: 'USD',
  impact: isDonation ? 'Demo impact' : 'Demo expense',
  notes: 'Demo transaction',
  ...(isDonation 
    ? { donor: `Donor ${Math.floor(Math.random() * 1000)}` }
    : { recipient: `Recipient ${Math.floor(Math.random() * 1000)}` }
  )
});

// UI Components Documentation
// Header Section: Contains dashboard title and control buttons
// Metrics Section: Displays key performance indicators
// Charts Section: Visualizes data trends and distributions
// Projects Section: Shows detailed project information
// Transactions Section: Lists recent financial activities

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
        const newTransaction = generateTransaction(transactions, isDonation);
        
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
  }, [isSimulating, simulationSpeed, transactions]);

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
                  NGO Financial Management Platform
                </h1>
                <p className="text-gray-600 mt-2">Comprehensive financial oversight and impact tracking dashboard</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  Last Updated: {new Date().toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={simulationSpeed}
                    onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                    className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {SPEED_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button 
                    onClick={() => setIsSimulating(!isSimulating)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isSimulating 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isSimulating ? 'Stop Demo' : 'Start Demo'}
                  </button>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Generate Report
                </button>
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

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Total Balance", value: `$${stats.totalBalance.toLocaleString()}`, change: "+2.5%", trend: "up" },
                { title: "Monthly Transactions", value: stats.monthlyTransactions, change: "+12%", trend: "up" },
                { title: "Active Projects", value: stats.projects, change: "0%", trend: "neutral" },
                { title: "Beneficiaries", value: stats.beneficiaries.toLocaleString(), change: "+5%", trend: "up" },
                { title: "Volunteers", value: stats.volunteers, change: "+3%", trend: "up" },
                { title: "Funding Utilization", value: `${stats.fundingUtilization}%`, change: "+2%", trend: "up" },
                { title: "Donor Retention", value: `${stats.donorRetention}%`, change: "+1%", trend: "up" },
                { title: "Program Efficiency", value: `${stats.programEfficiency}%`, change: "+5%", trend: "up" },
                { title: "Active Services", value: stats.activeServices, change: "0%", trend: "neutral" },
                { title: "Total Donations", value: `$${stats.totalDonations.toLocaleString()}`, change: "+8%", trend: "up" },
                { title: "Total Expenses", value: `$${stats.totalExpenses.toLocaleString()}`, change: "+6%", trend: "up" },
                { title: "Average Donation", value: `$${stats.averageDonation.toLocaleString()}`, change: "+4%", trend: "up" },
                { title: "Success Rate", value: `${stats.successRate}%`, change: "+2%", trend: "up" },
                { title: "Community Impact", value: `${stats.communityImpact}%`, change: "+3%", trend: "up" },
                { title: "Sustainability Score", value: `${stats.sustainabilityScore}%`, change: "+1%", trend: "up" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer h-full"
                >
                  <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : 
                      stat.trend === "down" ? "text-red-600" : 
                      "text-gray-600"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Projects Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Projects</h2>
                <div className="space-y-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{project.location}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-500">Raised:</span>
                          <span className="ml-2 font-medium">${project.raised.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Target:</span>
                          <span className="ml-2 font-medium">${project.target.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Impact Metrics</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {Object.entries(project.impactMetrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-500">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Timeline</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Start:</span>
                            <span className="ml-2">{new Date(project.startDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">End:</span>
                            <span className="ml-2">{new Date(project.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
                <div className="space-y-6">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{transaction.type}</h3>
                          <p className="text-sm text-gray-500 mt-1">{transaction.project}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-gray-600">
                          <span>{transaction.paymentMethod}</span>
                          <span className="mx-2">•</span>
                          <span>{transaction.reference}</span>
                          <span className="mx-2">•</span>
                          <span>{transaction.currency}</span>
                        </div>
                        <span className={`text-lg font-medium ${
                          transaction.type === 'Donation' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'Donation' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>{transaction.impact}</p>
                        <p className="mt-1">{transaction.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Performance</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="donations" stroke="#8884d8" strokeWidth={2} name="Donations" />
                      <Line type="monotone" dataKey="expenses" stroke="#82ca9d" strokeWidth={2} name="Expenses" />
                      <Line type="monotone" dataKey="beneficiaries" stroke="#ffc658" strokeWidth={2} name="Beneficiaries" />
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Category Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Impact Metrics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {impactMetrics.map((category) => (
                <div key={category.category} className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.metrics.map((metric) => (
                      <div key={metric.name}>
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>{metric.name}</span>
                          <span>{metric.value}/{metric.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(metric.value / metric.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Project Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{project.name}</h3>
                        <p className="text-sm text-gray-500">{project.location}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Team</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>Project Manager: {project.team.projectManager}</p>
                          <p>Field Coordinator: {project.team.fieldCoordinator}</p>
                          <p>Volunteers: {project.team.volunteers}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Milestones</h4>
                        <div className="space-y-2">
                          {project.milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <span className={`w-2 h-2 rounded-full ${
                                milestone.status === 'Completed' ? 'bg-green-500' :
                                milestone.status === 'In Progress' ? 'bg-yellow-500' :
                                'bg-gray-300'
                              }`} />
                              <span className="text-gray-600">{milestone.description}</span>
                              <span className="text-gray-400">{milestone.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 