import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import type { Booking, TimeSlot } from '../types/booking';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

// ── Inline Reschedule Panel ───────────────────────────────────────────────────

interface ReschedulePanelProps {
  booking: Booking;
  onConfirm: (date: string, time: string) => void;
  onCancel: () => void;
}

function ReschedulePanel({ booking, onConfirm, onCancel }: ReschedulePanelProps) {
  const { service: bookingService } = useBooking();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDate) {
      setSlots(bookingService.getAvailableSlots(selectedDate, booking.service));
      setSelectedTime(null);
    }
  }, [selectedDate, booking.service, bookingService]);

  const firstDay = new Date(viewYear, viewMonth, 1);
  // Monday-based offset: getDay() returns 0=Sun, so shift
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();

  function goMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y--; }
    if (m > 11) { m = 0; y++; }
    setViewMonth(m);
    setViewYear(y);
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    return d < today || d.getDay() === 0 || d.getDay() === 6;
  }

  function dateKey(day: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="border-t border-neutral-100 mt-4 pt-5">
        <p className="text-sm font-medium text-neutral-700 mb-4">Pick a new date and time</p>

        {/* Calendar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => goMonth(-1)}
              disabled={!canGoPrev}
              className="p-1 rounded hover:bg-neutral-100 disabled:opacity-30 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-500" />
            </button>
            <span className="text-sm font-medium text-neutral-800">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={() => goMonth(1)}
              className="p-1 rounded hover:bg-neutral-100 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-xs text-neutral-400 font-medium py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const key = dateKey(day);
              const disabled = isDisabled(day);
              const selected = selectedDate === key;
              return (
                <button
                  key={key}
                  onClick={() => !disabled && setSelectedDate(key)}
                  disabled={disabled}
                  className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                    selected
                      ? 'bg-primary text-white'
                      : disabled
                      ? 'text-neutral-300 cursor-not-allowed'
                      : 'hover:bg-primary-light text-neutral-700'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-5"
            >
              <p className="text-xs text-neutral-500 mb-2">Available times for {formatDate(selectedDate)}</p>
              {slots.filter(s => s.available).length === 0 ? (
                <p className="text-xs text-neutral-400">No slots available — pick another date.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {slots.map(slot => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 rounded-lg text-xs font-medium border transition-all ${
                        selectedTime === slot.time
                          ? 'bg-primary text-white border-primary'
                          : !slot.available
                          ? 'bg-neutral-50 text-neutral-300 border-neutral-100 cursor-not-allowed line-through'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-primary hover:text-primary hover:bg-primary-light'
                      }`}
                    >
                      {formatTime(slot.time)}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2">
          <button
            onClick={() => selectedDate && selectedTime && onConfirm(selectedDate, selectedTime)}
            disabled={!selectedDate || !selectedTime}
            className="flex items-center gap-1.5 bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Check className="w-3.5 h-3.5" /> Confirm
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors px-3 py-2"
          >
            <X className="w-3.5 h-3.5" /> Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Booking Card ──────────────────────────────────────────────────────────────

interface BookingCardProps {
  booking: Booking;
  isPast: boolean;
  rescheduleId: string | null;
  onReschedule: (id: string) => void;
  onCancelReschedule: () => void;
  onConfirmReschedule: (id: string, date: string, time: string) => void;
  onCancel: (id: string) => void;
}

function BookingCard({
  booking, isPast, rescheduleId,
  onReschedule, onCancelReschedule, onConfirmReschedule, onCancel,
}: BookingCardProps) {
  const isRescheduling = rescheduleId === booking.id;

  return (
    <div className={`bg-white rounded-2xl border p-5 transition-all ${
      isRescheduling ? 'border-primary/40 shadow-md' : 'border-neutral-200 shadow-sm'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-neutral-900 text-sm">{booking.service.name}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{booking.service.duration} min session · ${booking.service.price}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="flex items-center gap-1.5 text-sm text-neutral-600">
              <CalendarDays className="w-3.5 h-3.5 text-primary/70" />
              {formatDate(booking.date)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-neutral-600">
              <Clock className="w-3.5 h-3.5 text-primary/70" />
              {formatTime(booking.time)}
            </span>
          </div>
        </div>
        {!isPast && (
          <span className="shrink-0 text-xs font-medium bg-primary-light text-primary px-2.5 py-1 rounded-full">
            Upcoming
          </span>
        )}
      </div>

      {!isPast && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onReschedule(booking.id)}
            className="text-xs font-medium text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary-light transition-colors"
          >
            Reschedule
          </button>
          <button
            onClick={() => onCancel(booking.id)}
            className="text-xs font-medium text-neutral-500 border border-neutral-200 rounded-lg px-3 py-1.5 hover:border-red-300 hover:text-red-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      <AnimatePresence>
        {isRescheduling && (
          <ReschedulePanel
            booking={booking}
            onConfirm={(date, time) => onConfirmReschedule(booking.id, date, time)}
            onCancel={onCancelReschedule}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Tab = 'upcoming' | 'past';

export default function MyBookings() {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const { service: bookingService } = useBooking();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<Tab>('upcoming');
  const [rescheduleId, setRescheduleId] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) { navigate('/book'); return; }
    setBookings(bookingService.getBookingsByUser(userId));
  }, [userId, navigate, bookingService]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const upcoming = bookings
    .filter(b => b.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  const past = bookings
    .filter(b => b.date < todayStr)
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

  function handleCancel(id: string) {
    if (!window.confirm('Cancel this appointment?')) return;
    bookingService.cancelBooking(id);
    setBookings(prev => prev.filter(b => b.id !== id));
    if (rescheduleId === id) setRescheduleId(null);
  }

  function handleConfirmReschedule(id: string, date: string, time: string) {
    const updated = bookingService.rescheduleBooking(id, date, time);
    setBookings(prev => prev.map(b => b.id === id ? updated : b));
    setRescheduleId(null);
  }

  const shown = tab === 'upcoming' ? upcoming : past;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-light to-bg py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">Account</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">My Bookings</h1>
          <p className="text-neutral-600">View, reschedule, or cancel your appointments.</p>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Tabs */}
          <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 mb-8 w-fit">
            {(['upcoming', 'past'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                  tab === t
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {t}
                <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  tab === t ? 'bg-primary/10 text-primary' : 'bg-neutral-200 text-neutral-400'
                }`}>
                  {t === 'upcoming' ? upcoming.length : past.length}
                </span>
              </button>
            ))}
          </div>

          {/* List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {shown.length === 0 ? (
                <div className="text-center py-16 text-neutral-400">
                  <CalendarDays className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium text-neutral-500 mb-1">
                    {tab === 'upcoming' ? 'No upcoming appointments' : 'No past appointments'}
                  </p>
                  {tab === 'upcoming' && (
                    <Link to="/book" className="text-sm text-primary hover:underline mt-2 inline-block">
                      Book an appointment →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {shown.map(b => (
                      <motion.div
                        key={b.id}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                      >
                        <BookingCard
                          booking={b}
                          isPast={tab === 'past'}
                          rescheduleId={rescheduleId}
                          onReschedule={id => setRescheduleId(id === rescheduleId ? null : id)}
                          onCancelReschedule={() => setRescheduleId(null)}
                          onConfirmReschedule={handleConfirmReschedule}
                          onCancel={handleCancel}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
