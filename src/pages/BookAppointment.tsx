import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, CalendarDays, Clock, ClipboardList } from 'lucide-react';
import { SignInButton, Show } from '@clerk/react';
import { useBooking } from '../context/BookingContext';
import type { BookingStep } from '../types/booking';
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

// A step is reachable if all prior steps have data
function useStepReachable() {
  const { state } = useBooking();
  return (n: number) => {
    if (n === 1) return true;
    if (n === 2) return state.service != null;
    if (n === 3) return state.date != null;
    if (n === 4) return state.time != null;
    if (n === 5) return state.confirmedBooking != null;
    return false;
  };
}

function StepIndicator() {
  const { state, setStep } = useBooking();
  const isReachable = useStepReachable();
  const current = state.step;

  // A step has data regardless of whether it's before or after the current step
  const hasData = (n: number) => isReachable(n + 1) || (n === 4 && state.confirmedBooking != null);

  return (
    <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
      {STEPS.map((s, i) => {
        const filled = hasData(s.n) && s.n !== current;
        const active = current === s.n;
        const clickable = isReachable(s.n) && s.n !== current;
        return (
          <div key={s.n} className="flex items-center">
            <button
              onClick={() => clickable ? setStep(s.n as BookingStep) : undefined}
              disabled={!clickable}
              className={`flex items-center gap-2 ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                active
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : filled
                  ? 'bg-primary text-white'
                  : 'bg-neutral-200 text-neutral-400'
              }`}>
                {filled ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span className={`text-sm hidden sm:block ${active ? 'text-neutral-900 font-medium' : filled ? 'text-primary' : 'text-neutral-400'}`}>
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-2 transition-colors ${hasData(s.n) ? 'bg-primary' : 'bg-neutral-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BookingContent() {
  const { state, setStep } = useBooking();
  const isReachable = useStepReachable();
  const step = state.step;

  const panels: Record<number, React.ReactNode> = {
    1: <ServiceSelect />,
    2: <CalendarPicker />,
    3: <TimeSlotGrid />,
    4: <BookingForm />,
    5: <BookingConfirmation />,
  };

  // Left arrow: go back (steps 2–4)
  const canGoBack = step > 1 && step < 5;
  // Right arrow: go forward (steps 1–3; step 4 uses form submit)
  const canGoForward = step < 4 && isReachable(step + 1);

  return (
    <div>
      {step < 5 && <StepIndicator />}

      {/* Navigation arrows — hidden on confirmation screen */}
      {step < 5 && (canGoBack || canGoForward) && (
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-neutral-100">
          {canGoBack ? (
            <button
              onClick={() => setStep((step - 1) as BookingStep)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 hover:text-neutral-900 transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {canGoForward ? (
            <button
              onClick={() => setStep((step + 1) as BookingStep)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span />
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {panels[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function BookingSignInPrompt() {
  return (
    <div className="py-8 text-center flex flex-col items-center">
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-5">
        <CalendarDays className="w-7 h-7 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-neutral-900 mb-2">Sign in to book your appointment</h2>
      <p className="text-neutral-500 text-sm max-w-sm mb-8 leading-relaxed">
        Create a free account or sign in to book, manage and keep track of your appointments.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        <SignInButton mode="modal">
          <button className="bg-primary text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm">
            Sign in / Create account
          </button>
        </SignInButton>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm border-t border-neutral-100 pt-8 text-xs text-neutral-400">
        <div className="flex flex-col items-center gap-2">
          <CalendarDays className="w-5 h-5 text-primary/60" />
          <span>Easy booking</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Clock className="w-5 h-5 text-primary/60" />
          <span>Appointment reminders</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary/60" />
          <span>Booking history</span>
        </div>
      </div>
    </div>
  );
}

function BookingReset() {
  const { state, reset } = useBooking();
  useEffect(() => {
    if (state.confirmedBooking) reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function BookAppointment() {
  return (
    <>
    <BookingReset />
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
            <Show when="signed-out">
              <BookingSignInPrompt />
            </Show>
            <Show when="signed-in">
              <BookingContent />
            </Show>
          </div>

          {/* Sidebar info */}
          <div className="flex flex-col gap-5">
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
              <p className="font-semibold text-neutral-900 mb-3 text-sm">Clinic Information</p>
              <ul className="flex flex-col gap-2 text-sm text-neutral-600">
                <li>📍 Mitcham, Victoria 3132</li>
                <li>📞 (03) 1234 5678</li>
                <li>🕐 Mon – Fri, 9:00 AM – 7:00 PM</li>
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
    </>
  );
}
