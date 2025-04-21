'use client';

import { useSession } from 'next-auth/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TransactionMonitor from './components/TransactionMonitor';
import FinancialDashboard from './components/FinancialDashboard';
import { useRef } from 'react';
import Link from 'next/link';
import PageNav from './components/PageNav';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!session) {
    return (
      <div ref={containerRef} className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <PageNav />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section with Glassmorphism */}
            <motion.section 
              style={{ y, opacity }}
              className="relative h-screen flex items-center justify-center overflow-hidden"
            >
              {/* Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                />
              </div>

              {/* Content */}
              <div className="container mx-auto px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-4xl mx-auto text-center"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Financial Inclusion for All
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl mb-8 text-gray-600"
                  >
                    Empowering NGOs and underserved communities with secure, efficient, and accessible financial solutions through cutting-edge technology.
                  </motion.p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/dashboard"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      NGO Dashboard
                    </Link>
                    <Link
                      href="/ussd"
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      USSD Banking
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Features Section */}
            <section className="py-20 relative">
              <div className="container mx-auto px-4">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Our Solutions
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "NGO Financial Management",
                      description: "Advanced financial management platform for tracking donations, expenses, and project funding with real-time analytics and reporting.",
                      icon: "📊"
                    },
                    {
                      title: "USSD Banking",
                      description: "Universal banking access through USSD technology, enabling financial services for communities with limited internet connectivity.",
                      icon: "📱"
                    },
                    {
                      title: "Financial Empowerment",
                      description: "Comprehensive financial solutions and education programs designed to uplift underserved communities and drive sustainable growth.",
                      icon: "🌍"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                      className="p-8 rounded-2xl bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl transition-all border border-gray-100"
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { number: "500+", label: "NGOs Served" },
                    { number: "1M+", label: "People Reached" },
                    { number: "$50M+", label: "Funds Managed" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotateY: 10 }}
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-gray-600 mt-2">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated User Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNav />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Welcome to FinLink, {session.user?.name}!
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Last login: {new Date().toLocaleString()}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TransactionMonitor />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FinancialDashboard />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 