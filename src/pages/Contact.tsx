import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '(03) 1234 5678',
    href: 'tel:0312345678',
    sub: 'Mon – Fri, 9 AM – 5 PM',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@huyhuaphysio.com.au',
    href: 'mailto:hello@huyhuaphysio.com.au',
    sub: 'We aim to respond within 1 business day',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Mitcham, Victoria 3132',
    href: '#map',
    sub: 'Parking available on-site',
  },
  {
    icon: Clock,
    title: 'Hours',
    value: 'Mon – Fri: 9:00 AM – 5:00 PM',
    href: undefined,
    sub: 'Closed weekends & public holidays',
  },
];

export default function Contact() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Contact</motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">Get in Touch</motion.h1>
            <motion.p variants={fadeUp} className="text-neutral-600 text-lg leading-relaxed">
              Questions about our services, or ready to book? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
          >
            {contactInfo.map(item => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="bg-neutral-50 rounded-2xl border border-neutral-100 p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">{item.title}</p>
                {item.href ? (
                  <a href={item.href} className="font-semibold text-neutral-800 hover:text-primary transition-colors text-sm">
                    {item.value}
                  </a>
                ) : (
                  <p className="font-semibold text-neutral-800 text-sm">{item.value}</p>
                )}
                <p className="text-xs text-neutral-400">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="flex items-center gap-4 mb-16"
          >
            <motion.p variants={fadeUp} className="text-sm text-neutral-500">Follow us:</motion.p>
            {[
              {
                label: 'Instagram', href: '#',
                svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
              },
              {
                label: 'Facebook', href: '#',
                svg: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
              },
            ].map(({ label, href, svg }) => (
              <motion.a
                key={label}
                href={href}
                variants={fadeUp}
                aria-label={label}
                className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2"
              >
                {svg} {label}
              </motion.a>
            ))}
          </motion.div>

          {/* Google Maps embed — Mitcham VIC */}
          <motion.div
            id="map"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm"
          >
            <iframe
              title="Huy Hua Physiotherapy — Mitcham, VIC"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.5623457568087!2d145.19573!3d-37.81748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad640a3b2c1b8e5%3A0x9c1a3e4b5e6f7g8h!2sMitcham+VIC+3132!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
