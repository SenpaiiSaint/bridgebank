import { motion } from 'framer-motion';

const stats = [
  { number: "500+", label: "NGOs Served", icon: "🤝" },
  { number: "1M+", label: "People Reached", icon: "🌐" },
  { number: "$50M+", label: "Funds Managed", icon: "💸" },
];

export function ImpactSection() {
  return (
    <section className="relative py-24 w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200" style={{ position: 'relative', left: '50%', right: '50%', transform: 'translateX(-50%)' }}>
      {/* Decorative top background image */}
      <img src="/images/line3.png" alt="" aria-hidden="true" className="absolute top-0 left-0 w-full h-auto z-0 pointer-events-none" />
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Our Impact
        </motion.h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">{stat.number}</div>
              <div className="text-gray-700 text-lg font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 