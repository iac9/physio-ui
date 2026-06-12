import { motion } from 'framer-motion';
import { ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ServiceCard } from '../components/ui/ServiceCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const previewServices = services.slice(0, 3);
  const previewTestimonials = testimonials.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-light to-bg min-h-[88vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest bg-primary-light px-3 py-1.5 rounded-full mb-4">
                Mitcham, Victoria
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight tracking-tight">
                Expert Physio, <br />
                <span className="text-primary">Personalised</span> Care
              </h1>
            </motion.div>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed max-w-md">
              Huy Hua Physiotherapy offers evidence-based treatment and rehabilitation tailored to your goals. Whether recovering from injury or managing chronic pain — we help you move better.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button href="/book" size="lg">
                Book an Appointment <ArrowRight className="w-4 h-4" />
              </Button>
              <Button href="/services" size="lg" variant="outline">
                Our Services
              </Button>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 pt-2">
              {[
                { icon: Shield, text: 'AHPRA Registered' },
                { icon: Award, text: '10+ Years Experience' },
                { icon: Clock, text: 'Same-Week Appointments' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-neutral-500">
                  <Icon className="w-4 h-4 text-primary" />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 aspect-[4/5] max-h-[520px] flex items-center justify-center border border-primary/10 overflow-hidden">
              <div className="text-center text-neutral-400 p-8">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👨‍⚕️</span>
                </div>
                <p className="text-sm">Photo placeholder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services preview */}
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
              What We Treat
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Comprehensive Physiotherapy Services
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-500 mt-3 max-w-xl mx-auto">
              From acute injuries to long-term rehabilitation, we provide evidence-based care across a wide range of conditions.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {previewServices.map(s => (
              <motion.div key={s.id} variants={fadeUp}>
                <ServiceCard
                  icon={s.icon}
                  title={s.title}
                  description={s.shortDescription}
                  price={s.price}
                  duration={s.duration}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <Button href="/services" variant="outline" size="lg">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 aspect-square max-h-[400px] flex items-center justify-center border border-primary/10">
            <div className="text-center text-neutral-400">
              <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center text-3xl">👨‍⚕️</div>
              <p className="text-sm">Huy Hua</p>
            </div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="flex flex-col gap-5"
          >
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase">
              Meet Your Physio
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              Huy Hua, B.Physiotherapy
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-600 leading-relaxed">
              With over a decade of clinical experience, Huy brings a patient-centred, evidence-based approach to every consultation. He is passionate about educating patients and empowering long-term recovery.
            </motion.p>
            <motion.p variants={fadeUp} className="text-neutral-600 leading-relaxed">
              Trained at [University Placeholder], Huy has worked across sports medicine, post-surgical rehabilitation, and chronic pain management.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button href="/about" variant="outline">
                Learn More About Huy
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials preview */}
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
              Client Reviews
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-neutral-900">
              What Our Patients Say
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {previewTestimonials.map(t => (
              <motion.div key={t.id} variants={fadeUp}>
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Button href="/testimonials" variant="outline">
              Read All Reviews <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 bg-primary">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="max-w-3xl mx-auto px-4 sm:px-6 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Feel Better?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/80 text-lg mb-8">
            Book your appointment online in minutes. Same-week availability, Mitcham clinic.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
            <Button href="/book" size="lg" variant="white">
              Book Now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button href="/contact" size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/30">
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
