import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { BookingProvider, useBooking } from '../context/BookingContext';
import { ServiceSelect } from '../components/booking/ServiceSelect';
import { CalendarPicker } from '../components/booking/CalendarPicker';
import { TimeSlotGrid } from '../components/booking/TimeSlotGrid';
import { BookingForm } from '../components/booking/BookingForm';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';

const STEPS = [
  { n: 1, label: 'Service' },
  { n: 2, label: 'Date' },
  { n: 3, label: 'Time' },
  { n: 4, label: 'Details' },
  { n: 5, label: 'Confirm' },
];

function StepIndicator() {
  const { state, setStep } = useBooking();
  const current = state.step;

  return (
    <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
      {STEPS.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <div key={s.n} className="flex items-center">
            <button
              onClick={() => done ? setStep(s.n as 1|2|3|4|5) : undefined}
              disabled={!done}
              className={`flex items-center gap-2 ${done ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                done
                  ? 'bg-primary text-white'
                  : active
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : 'bg-neutral-200 text-neutral-400'
              }`}>
                {done ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span className={`text-sm hidden sm:block ${active ? 'text-neutral-900 font-medium' : done ? 'text-primary' : 'text-neutral-400'}`}>
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 transition-colors ${done || (active && current > s.n) ? 'bg-primary' : 'bg-neutral-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BookingContent() {
  const { state } = useBooking();

  const panels: Record<number, React.ReactNode> = {
    1: <ServiceSelect />,
    2: <CalendarPicker />,
    3: <TimeSlotGrid />,
    4: <BookingForm />,
    5: <BookingConfirmation />,
  };

  return (
    <div>
      {state.step < 5 && <StepIndicator />}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {panels[state.step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function BookAppointment() {
  return (
    <BookingProvider>
      <section className="bg-gradient-to-br from-primary-light to-bg py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-lg">
            <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">Booking</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">Book an Appointment</h1>
            <p className="text-neutral-600">Online booking, no phone call required.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Main booking panel */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
            <BookingContent />
          </div>

          {/* Sidebar info */}
          <div className="flex flex-col gap-5">
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
              <p className="font-semibold text-neutral-900 mb-3 text-sm">Clinic Information</p>
              <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                <li>📍 Mitcham, Victoria 3132</li>
                <li>📞 (03) 1234 5678</li>
                <li>🕐 Mon – Fri, 9:00 AM – 5:00 PM</li>
              </ul>
            </div>
            <div className="bg-primary-light rounded-2xl p-6">
              <p className="font-semibold text-primary-dark mb-2 text-sm">What to bring</p>
              <ul className="flex flex-col gap-1.5 text-sm text-neutral-700">
                <li>• Referral letter (if applicable)</li>
                <li>• Imaging reports (X-ray, MRI)</li>
                <li>• Medicare / private health card</li>
                <li>• Comfortable, loose clothing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </BookingProvider>
  );
}
