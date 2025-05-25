'use client';

import { useSession } from 'next-auth/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import TransactionMonitor from './components/TransactionMonitor';
import FinancialDashboard from './components/FinancialDashboard';
import { useRef } from 'react';
import Link from 'next/link';
import PageNav from './components/PageNav';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ImpactSection } from './components/ImpactSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PartnersSection } from './components/PartnersSection';
import { CallToActionSection } from './components/CallToActionSection';
import React from 'react';

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

  // Scroll-to-top button
  const [showTop, setShowTop] = React.useState(false);
  React.useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <div
        ref={containerRef}
        className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50 relative"
      >
        {/* Sticky, blurred nav */}
        <div className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md shadow-sm">
          <PageNav />
        </div>
        {/* Sections with motion transitions and spacing */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <HeroSection topImageUrl="/images/hero.webp" topImageAlt="Abstract financial inclusion illustration" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          <FeaturesSection />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
          <ImpactSection />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
          <TestimonialsSection />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
          <PartnersSection />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }}>
          <CallToActionSection />
        </motion.div>
        {/* Scroll to top button */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Scroll to top"
          >
            ↑
          </button>
        )}
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
              Welcome to BridgeBank, {session.user?.name}!
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