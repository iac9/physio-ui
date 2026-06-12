import { motion } from 'framer-motion';
import { PricingCard } from '../components/ui/PricingCard';
import { CheckCircle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const plans = [
  {
    title: 'Follow-up Appointment',
    price: 90,
    duration: 'session',
    description: '30-minute follow-up for ongoing treatment and progress review.',
    featured: false,
    features: [
      '30 minute appointment',
      'Progress assessment',
      'Continued manual therapy',
      'Exercise program review',
      'Home management advice',
    ],
  },
  {
    title: 'Initial Consultation',
    price: 130,
    duration: 'session',
    description: 'Full 60-minute initial assessment, diagnosis, and commencement of treatment.',
    featured: true,
    features: [
      '60 minute appointment',
      'Comprehensive assessment',
      'Diagnosis & treatment plan',
      'Hands-on treatment',
      'Personalised exercise program',
      'Follow-up recommendations',
    ],
  },
  {
    title: 'Extended Rehabilitation',
    price: 115,
    duration: 'session',
    description: '45-minute extended session for complex rehabilitation programs.',
    featured: false,
    features: [
      '45 minute appointment',
      'Detailed exercise therapy',
      'Functional movement training',
      'Manual therapy',
      'Progress tracking',
    ],
  },
];

const rebates = [
  { name: 'Private Health Insurance', detail: 'Most extras policies cover physiotherapy. Rebate varies by fund and policy.' },
  { name: 'Medicare (EPC/GPMP)', detail: 'Up to 5 sessions per calendar year with a valid Enhanced Primary Care plan from your GP.' },
  { name: 'WorkCover', detail: 'Accepted for workplace injury claims. Bring your claim number and relevant paperwork.' },
  { name: 'TAC', detail: 'Accepted for transport accident claims.' },
  { name: 'DVA', detail: 'Department of Veterans\' Affairs accepted. Contact us to confirm eligibility.' },
];

export default function Pricing() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Pricing</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">Transparent Pricing</motion.h1>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed">
              No hidden fees. Clear, fair pricing with private health rebates available on the spot via HICAPS.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
          >
            {plans.map(p => (
              <motion.div key={p.title} variants={fadeUp}>
                <PricingCard {...p} />
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-neutral-400 text-sm mt-8"
          >
            Prices are indicative. Concession and bulk billing options may be available — please enquire.
          </motion.p>
        </div>
      </section>

      {/* Rebates */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-2">Rebates & Claims</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold text-neutral-900">Funding Options</motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-500 mt-3">We accept a range of funding schemes to make physiotherapy accessible.</motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden"
          >
            {rebates.map((r, i) => (
              <motion.div
                key={r.name}
                variants={fadeUp}
                className={`flex items-start gap-4 p-5 ${i < rebates.length - 1 ? 'border-b border-neutral-100' : ''}`}
              >
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-800 text-sm">{r.name}</p>
                  <p className="text-neutral-500 text-sm mt-0.5">{r.detail}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
