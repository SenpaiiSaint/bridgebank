import { motion } from "framer-motion";
import Link from "next/link";

export function CallToActionSection() {
  return (
    <section
      className="relative py-20 w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2 bg-gradient-to-br from-blue-300 via-blue-700 to-blue-900"
      style={{
        position: "relative",
        left: "50%",
        right: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {/* Decorative top background image */}
      <img
        src="/images/line7.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-auto z-0 pointer-events-none"
      />
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          Ready to Empower Your Community?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-2xl text-blue-100 mb-8"
        >
          Join hundreds of NGOs and community leaders using BridgeBank to drive
          financial inclusion and impact.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-blue-100 transition-colors text-lg"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
