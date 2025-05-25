'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PageNav() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyles, setIndicatorStyles] = useState({
    width: 0,
    left: 0,
    height: 0,
  });
  const navRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'USSD', path: '/ussd' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const index = navItems.findIndex(item => item.path === pathname);
    if (index !== -1) {
      setActiveIndex(index);
      const activeElement = navRefs.current[index];
      if (activeElement) {
        setIndicatorStyles({
          width: activeElement.offsetWidth,
          left: activeElement.offsetLeft,
          height: activeElement.offsetHeight,
        });
      }
    }
  }, [pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/30 backdrop-blur-xl border-b border-white/30 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ x: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                BridgeBank
              </span>
            </Link>
          </motion.div>
          
          <div className="flex items-center relative py-2">
            <motion.div
              className="absolute bg-white/40 backdrop-blur-lg border border-white/30 shadow rounded-lg"
              initial={false}
              animate={{
                width: indicatorStyles.width,
                left: indicatorStyles.left,
                height: indicatorStyles.height,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 0.5,
                restDelta: 0.001,
                restSpeed: 0.001
              }}
            />
            {navItems.map((item, index) => (
              <div
                key={item.path}
                ref={(el: HTMLDivElement | null) => {
                  if (el) navRefs.current[index] = el;
                }}
                className="relative px-2"
              >
                <Link
                  href={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors block ${
                    pathname === item.path
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 