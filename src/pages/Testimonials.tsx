import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { Button } from '../components/ui/Button';
import { testimonials } from '../data/testimonials';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Testimonials() {
  const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
              Patient Reviews
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              What Our Patients Say
            </motion.h1>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed">
              Real experiences from patients who've trusted Huy Hua Physiotherapy with their recovery.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-10 bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap gap-8 justify-center sm:justify-start">
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" strokeWidth={1} />
              ))}
            </div>
            <p className="text-2xl font-bold text-neutral-900">{avgRating}</p>
            <p className="text-xs text-neutral-400">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-900">{testimonials.length}+</p>
            <p className="text-xs text-neutral-400">Patient Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-neutral-900">100%</p>
            <p className="text-xs text-neutral-400">Would Recommend</p>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {testimonials.map(t => (
              <motion.div key={t.id} variants={fadeUp}>
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Difference?</h2>
          <p className="text-white/80 mb-8">Join our patients on the path to better movement and lasting recovery.</p>
          <Button href="/book" size="lg" variant="white">
            Book an Appointment
          </Button>
        </div>
      </section>
    </div>
  );
}
