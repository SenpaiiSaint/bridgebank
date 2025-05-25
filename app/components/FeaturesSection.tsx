import { motion } from 'framer-motion';
import Link from 'next/link';

const features = [
  {
    title: "NGO Financial Management",
    description: "Track donations, expenses, and project funding with real-time analytics and reporting.",
    icon: "📊",
    cta: { label: 'Learn More', href: '/about' },
  },
  {
    title: "USSD Banking",
    description: "Universal banking access through USSD technology for communities with limited internet.",
    icon: "📱",
    cta: { label: 'Try USSD', href: '/ussd' },
  },
  {
    title: "Financial Empowerment",
    description: "Education programs and solutions to uplift underserved communities.",
    icon: "🌍",
    cta: { label: 'Our Impact', href: '/about' },
  },
];

export function FeaturesSection() {
  return (
    <section className="relative w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 py-24 bg-gradient-to-br from-teal-400 via-blue-200 to-purple-200" style={{ position: 'relative', left: '50%', right: '50%', transform: 'translateX(-50%)' }}>
      {/* Decorative top background image */}
      <img src="/images/line2.png" alt="" aria-hidden="true" className="absolute top-0 left-0 w-full h-auto z-0 pointer-events-none" />
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Our Solutions
        </motion.h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Link href={feature.cta.href} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-semibold shadow">{feature.cta.label}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 