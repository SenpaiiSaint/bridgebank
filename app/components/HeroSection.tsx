import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroSectionProps {
  topImageUrl?: string;
  topImageAlt?: string;
  children?: React.ReactNode;
}

export function HeroSection({ topImageUrl, topImageAlt, children }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 flex flex-col items-center justify-center overflow-hidden" style={{ position: 'relative', left: '50%', right: '50%', transform: 'translateX(-50%)' }}>
      {/* Vibrant mesh/gradient background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-blue-500 via-teal-400 to-purple-600">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,400 Q360,600 720,400 T1440,400 V800 H0 Z" fill="#fff" fillOpacity="0.2" />
        </svg>
      </div>
      {/* Overlay top image */}
      {topImageUrl && (
        <motion.img
          src={topImageUrl}
          alt={topImageAlt}
          className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl pointer-events-none object-contain"
          style={{ aspectRatio: 'auto' }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      )}
      {/* Centered hero content, no card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-600">Financial Inclusion for All</h1>
        <p className="text-lg md:text-2xl text-white mb-8 font-medium drop-shadow-lg">Empowering NGOs and underserved communities with secure, efficient, and accessible financial solutions through cutting-edge technology.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <Link href="/dashboard" className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg">Get Started</Link>
          <Link href="#how-it-works" className="px-8 py-4 bg-white border border-blue-600 text-blue-700 rounded-xl hover:bg-blue-50 transition-colors text-lg font-semibold shadow">See How It Works</Link>
        </div>
        {children}
      </motion.div>
    </section>
  );
} 