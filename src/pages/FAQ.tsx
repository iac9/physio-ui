import { motion } from 'framer-motion';
import { AccordionItem } from '../components/ui/AccordionItem';
import { Button } from '../components/ui/Button';
import { faqs } from '../data/faq';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const categories = [...new Set(faqs.map(f => f.category))];

export default function FAQ() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">FAQ</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">Frequently Asked Questions</motion.h1>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed">
              Answers to the most common questions about physiotherapy, appointments, and costs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className={ci > 0 ? 'mt-12' : ''}
            >
              <motion.p variants={fadeUp} className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                {cat}
              </motion.p>
              <motion.div variants={fadeUp} className="bg-white rounded-2xl border border-neutral-200 px-6 overflow-hidden">
                {faqs.filter(f => f.category === cat).map(f => (
                  <AccordionItem key={f.id} question={f.question} answer={f.answer} />
                ))}
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 bg-primary-light rounded-2xl p-8 text-center"
          >
            <h3 className="font-bold text-neutral-900 text-xl mb-2">Still Have Questions?</h3>
            <p className="text-neutral-600 text-sm mb-6">We're happy to help. Reach out via phone, email, or book an initial consultation.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button href="/contact" variant="outline">Contact Us</Button>
              <Button href="/book">Book an Appointment</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
