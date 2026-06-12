import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { StarRatingInput } from '../components/ui/StarRatingInput';
import { Button } from '../components/ui/Button';
import { testimonials as seedTestimonials, type Testimonial } from '../data/testimonials';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

interface FormState {
  name: string;
  condition: string;
  rating: number;
  text: string;
}

const EMPTY_FORM: FormState = { name: '', condition: '', rating: 0, text: '' };

export default function Testimonials() {
  const [submitted, setSubmitted] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [success, setSuccess] = useState(false);

  const allTestimonials = [...submitted, ...seedTestimonials];
  const avgRating = (allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length).toFixed(1);

  const validate = (): Partial<Record<keyof FormState, string>> => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Your name is required';
    if (!form.condition.trim()) e.condition = 'Please enter your condition or treatment';
    if (form.rating === 0) e.rating = 'Please select a star rating';
    if (!form.text.trim()) e.text = 'Please write your review';
    else if (form.text.trim().length < 20) e.text = 'Review must be at least 20 characters';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const newReview: Testimonial = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      condition: form.condition.trim(),
      rating: form.rating,
      text: form.text.trim(),
      date: new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' }),
    };

    setSubmitted(prev => [newReview, ...prev]);
    setForm(EMPTY_FORM);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const field = (
    id: keyof FormState,
    label: string,
    placeholder: string,
    required = true
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type="text"
        value={form[id] as string}
        onChange={ev => setForm(f => ({ ...f, [id]: ev.target.value }))}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:ring-2 focus:ring-primary/30 ${
          errors[id] ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-neutral-300 focus:border-primary'
        }`}
      />
      {errors[id] && <p className="mt-1 text-xs text-red-500">{errors[id]}</p>}
    </div>
  );

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
            <p className="text-2xl font-bold text-neutral-900">{allTestimonials.length}</p>
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
            <AnimatePresence>
              {submitted.map(t => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative">
                    <span className="absolute -top-2 -right-2 z-10 text-xs font-semibold bg-primary text-white px-2 py-0.5 rounded-full">New</span>
                    <TestimonialCard {...t} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {seedTestimonials.map(t => (
              <motion.div key={t.id} variants={fadeUp}>
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leave a review */}
      <section id="leave-review" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
              Share Your Experience
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-neutral-900">
              Leave a Review
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-500 mt-3">
              Been a patient? We'd love to hear about your experience.
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Thank you for your review!</h3>
                <p className="text-neutral-500 text-sm">Your feedback has been added to the page.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8 flex flex-col gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {field('name', 'Your Name', 'Jane Smith')}
                  {field('condition', 'Condition / Treatment', 'e.g. Lower Back Pain')}
                </div>

                <div>
                  <p className="block text-sm font-medium text-neutral-700 mb-2">
                    Rating <span className="text-red-400">*</span>
                  </p>
                  <StarRatingInput value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
                  {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
                </div>

                <div>
                  <label htmlFor="review-text" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Your Review <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="review-text"
                    value={form.text}
                    onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                    placeholder="Tell us about your experience with Huy Hua Physiotherapy..."
                    rows={4}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:ring-2 focus:ring-primary/30 resize-none ${
                      errors.text ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-neutral-300 focus:border-primary'
                    }`}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.text
                      ? <p className="text-xs text-red-500">{errors.text}</p>
                      : <span />
                    }
                    <p className="text-xs text-neutral-400 text-right">{form.text.length} chars</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="self-start bg-primary text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors"
                >
                  Submit Review
                </button>
              </motion.form>
            )}
          </AnimatePresence>
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
