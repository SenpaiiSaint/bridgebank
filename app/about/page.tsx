'use client';

import { motion } from 'framer-motion';
import PageNav from '../components/PageNav';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageNav />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                About FinLink
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Bridging financial gaps through innovative technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  FinLink is dedicated to empowering NGOs and underserved communities with accessible financial services. 
                  We believe that everyone deserves access to secure and efficient financial tools, regardless of their location or circumstances.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  We envision a world where financial services are accessible to all, enabling communities to thrive and 
                  organizations to make a greater impact. Through our innovative platform, we're making this vision a reality.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  'NGO Financial Management',
                  'USSD Banking Services',
                  'Real-time Transaction Monitoring',
                  'Secure Payment Processing',
                  'Multi-language Support',
                  'Comprehensive Reporting'
                ].map((feature, index) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <span className="mr-2 text-blue-600">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 