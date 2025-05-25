import { motion } from 'framer-motion';

const partners = [
  { name: 'Red Cross', logo: '/partners/red-cross.png' },
  { name: 'UNICEF', logo: '/partners/unicef.png' },
  { name: 'World Bank', logo: '/partners/world-bank.png' },
  { name: 'Save the Children', logo: '/partners/save-the-children.png' },
  { name: 'Oxfam', logo: '/partners/oxfam.png' },
  { name: 'CARE', logo: '/partners/care.png' },
];

export function PartnersSection() {
  return (
    <section className="relative py-20 w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" style={{ position: 'relative', left: '50%', right: '50%', transform: 'translateX(-50%)' }}>
      {/* Decorative top background image */}
      <img src="/images/line6.png" alt="" aria-hidden="true" className="absolute top-0 left-0 w-full h-auto z-0 pointer-events-none" />
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
        >
          Trusted by Leading NGOs
        </motion.h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 px-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center hover:shadow-2xl transition-shadow"
            >
              <img
                src={p.logo}
                alt={p.name + ' logo'}
                className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 