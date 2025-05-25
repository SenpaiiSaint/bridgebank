import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Amina Bello',
    role: 'NGO Director',
    quote: 'FinLink has transformed the way we manage our funds and reach our beneficiaries. The platform is intuitive and secure.',
    avatar: '/avatars/amina.jpg',
  },
  {
    name: 'Samuel Okoro',
    role: 'Community Leader',
    quote: 'USSD banking made it possible for our members to access financial services for the first time. Truly empowering!',
    avatar: '/avatars/samuel.jpg',
  },
  {
    name: 'Ngozi Umeh',
    role: 'Project Manager',
    quote: 'The analytics and reporting tools help us make better decisions and show impact to our donors.',
    avatar: '/avatars/ngozi.jpg',
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" style={{ position: 'relative', left: '50%', right: '50%', transform: 'translateX(-50%)' }}>
      {/* Decorative top background image */}
      <img src="/images/line6.png" alt="" aria-hidden="true" className="absolute top-0 left-0 w-full h-auto z-0 pointer-events-none" />
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
        >
          What Our Partners Say
        </motion.h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
            >
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 object-cover" loading="lazy" />
              <blockquote className="text-gray-700 italic mb-4 text-lg">“{t.quote}”</blockquote>
              <div className="font-semibold text-blue-700">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 