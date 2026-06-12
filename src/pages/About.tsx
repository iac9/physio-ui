import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, Heart, Users, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const qualifications = [
  'Bachelor of Physiotherapy, [University Placeholder]',
  'AHPRA Registered Physiotherapist',
  'Member, Australian Physiotherapy Association (APA)',
  'Certificate in Dry Needling',
  'Sports Physiotherapy Accreditation',
  'Certificate in Manual Therapy',
];

const whyChoose = [
  {
    icon: GraduationCap,
    title: 'Evidence-Based Practice',
    text: 'Every treatment plan is grounded in the latest clinical research and best practice guidelines.',
  },
  {
    icon: Heart,
    title: 'Patient-Centred',
    text: 'Your goals, timeline, and preferences guide every aspect of your care.',
  },
  {
    icon: Users,
    title: 'One-on-One Attention',
    text: 'As a solo practitioner, Huy gives every patient his undivided attention.',
  },
  {
    icon: Shield,
    title: 'Trusted & Experienced',
    text: 'Over a decade of clinical experience across sports, post-surgical, and chronic conditions.',
  },
];

export default function About() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
              About
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
              Meet Huy Hua
            </motion.h1>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed">
              Physiotherapist, Mitcham VIC. Dedicated to helping people move better, live well, and recover with confidence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Bio section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-start">
          {/* Photo placeholder */}
          <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 aspect-[3/4] max-h-[480px] flex items-center justify-center border border-primary/10">
            <div className="text-center text-neutral-400">
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center text-4xl">👨‍⚕️</div>
              <p className="text-sm font-medium">Huy Hua</p>
              <p className="text-xs mt-1">Physiotherapist</p>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col gap-6"
          >
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-neutral-900">
              A Little About Me
            </motion.h2>
            <motion.div variants={fadeUp} className="flex flex-col gap-4 text-neutral-600 leading-relaxed">
              <p>
                I'm Huy Hua, a physiotherapist based in Mitcham, Victoria. I graduated from [University Placeholder] with a Bachelor of Physiotherapy and have since spent over a decade working with patients across a wide range of conditions — from weekend warriors recovering from sports injuries to older adults managing osteoarthritis and post-surgical rehabilitation.
              </p>
              <p>
                I believe that good physiotherapy goes beyond treating symptoms. My approach is to understand the whole person — their lifestyle, goals, and concerns — and create a treatment plan that genuinely works for them. I take time to explain what's happening with your body and give you the tools to maintain your progress long after our sessions end.
              </p>
              <p>
                Outside the clinic, I stay current with ongoing professional development, regularly attending seminars and workshops to ensure my practice reflects the latest evidence.
              </p>
            </motion.div>

            {/* Qualifications */}
            <motion.div variants={fadeUp}>
              <h3 className="font-semibold text-neutral-900 mb-4">Qualifications & Memberships</h3>
              <ul className="flex flex-col gap-2.5">
                {qualifications.map(q => (
                  <li key={q} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600">{q}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button href="/book">Book an Appointment</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">
              My Philosophy
            </motion.p>
            <motion.blockquote variants={fadeUp} className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 leading-snug mb-6">
              "Movement is medicine. My goal is to give every patient the knowledge and ability to take control of their own health."
            </motion.blockquote>
            <motion.p variants={fadeUp} className="text-neutral-500 text-sm">— Huy Hua, Physiotherapist</motion.p>
          </motion.div>
        </div>
      </section>

      {/* Why choose section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
              Why Choose Us
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              The Huy Hua Difference
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChoose.map(item => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-neutral-50 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow border border-neutral-100"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
