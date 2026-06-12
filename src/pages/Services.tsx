import { motion } from 'framer-motion';
import { ServiceCard } from '../components/ui/ServiceCard';
import { Button } from '../components/ui/Button';
import { services } from '../data/services';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Services() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
              Services
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              What We Treat
            </motion.h1>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed">
              Evidence-based physiotherapy and rehabilitation services for a wide range of musculoskeletal and sports conditions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map(s => (
              <motion.div key={s.id} variants={fadeUp}>
                <ServiceCard
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  price={s.price}
                  duration={s.duration}
                  showBookCta
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Your Path to Recovery
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { step: '01', title: 'Book Online', text: 'Choose a service, select a date and time that works for you.' },
              { step: '02', title: 'Initial Assessment', text: 'Thorough evaluation of your condition, history, and goals.' },
              { step: '03', title: 'Treatment Plan', text: 'A personalised plan combining manual therapy, exercise, and education.' },
              { step: '04', title: 'Recovery & Beyond', text: 'Guided progress with tools to maintain long-term results.' },
            ].map(item => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl font-bold text-primary/20">{item.step}</span>
                <h3 className="font-semibold text-neutral-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-white/80 mb-8">Book an initial consultation and Huy will assess your condition and recommend the best treatment approach.</p>
          <Button href="/book" size="lg" variant="white">
            Book an Initial Consult
          </Button>
        </div>
      </section>
    </div>
  );
}
