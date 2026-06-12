import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  Booking,
  BookingFormData,
  BookingServiceInterface,
  BookingState,
  BookingStep,
  Service,
  TimeSlot,
} from '../types/booking';

// Booking services available in the calendar
export const BOOKING_SERVICES: Service[] = [
  {
    id: 'initial',
    name: 'Initial Consultation',
    duration: 60,
    description: 'Comprehensive assessment, diagnosis, and commencement of treatment.',
    price: 130,
  },
  {
    id: 'followup',
    name: 'Follow-up Appointment',
    duration: 30,
    description: 'Ongoing treatment and progress review.',
    price: 90,
  },
  {
    id: 'extended',
    name: 'Extended Rehabilitation',
    duration: 45,
    description: 'Longer session for complex rehabilitation programs.',
    price: 115,
  },
];

// Deterministically pre-book some slots so the mock calendar looks realistic
const MOCK_BOOKED: Record<string, string[]> = {};

function seedMockBookings() {
  const today = new Date();
  for (let d = 0; d < 14; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const key = date.toISOString().slice(0, 10);
    // Book ~30% of slots on each day
    MOCK_BOOKED[key] = ['09:00', '10:30', '14:00', '15:30'].slice(0, (d % 3) + 1);
  }
}
seedMockBookings();

// Generate all slot times for a given service duration
function generateSlots(duration: number): string[] {
  const slots: string[] = [];
  const start = 9 * 60; // 9:00 AM
  const end = 17 * 60;  // 5:00 PM
  for (let t = start; t + duration <= end; t += 30) {
    const h = String(Math.floor(t / 60)).padStart(2, '0');
    const m = String(t % 60).padStart(2, '0');
    slots.push(`${h}:${m}`);
  }
  return slots;
}

// In-memory booking store
let bookings: Booking[] = [];

const inMemoryBookingService: BookingServiceInterface = {
  getServices: () => BOOKING_SERVICES,

  getAvailableSlots: (date: string, service: Service): TimeSlot[] => {
    const booked = MOCK_BOOKED[date] ?? [];
    const sessionBooked = bookings
      .filter(b => b.date === date)
      .map(b => b.time);
    const allBooked = new Set([...booked, ...sessionBooked]);
    return generateSlots(service.duration).map(time => ({
      time,
      available: !allBooked.has(time),
    }));
  },

  createBooking: (data): Promise<Booking> => {
    const booking: Booking = { ...data, id: crypto.randomUUID() };
    bookings = [...bookings, booking];
    return Promise.resolve(booking);
  },

  getBookings: () => bookings,
};

// Context
interface BookingContextValue {
  state: BookingState;
  service: BookingServiceInterface;
  setStep: (step: BookingStep) => void;
  selectService: (s: Service) => void;
  selectDate: (date: string) => void;
  selectTime: (time: string) => void;
  setFormData: (data: BookingFormData) => void;
  confirmBooking: (booking: Booking) => void;
  reset: () => void;
}

const DEFAULT_FORM: BookingFormData = { clientName: '', email: '', phone: '', notes: '' };

const DEFAULT_STATE: BookingState = {
  step: 1,
  service: null,
  date: null,
  time: null,
  formData: DEFAULT_FORM,
  confirmedBooking: null,
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(DEFAULT_STATE);

  const setStep = (step: BookingStep) => setState(s => ({ ...s, step }));
  // Only clear downstream data when the selection actually changes
  const selectService = (service: Service) => setState(s => ({
    ...s,
    service,
    date: s.service?.id === service.id ? s.date : null,
    time: s.service?.id === service.id ? s.time : null,
    step: 2,
  }));
  const selectDate = (date: string) => setState(s => ({
    ...s,
    date,
    time: s.date === date ? s.time : null,
    step: 3,
  }));
  // selectTime only saves the selection — navigation to step 4 is via the Confirm button
  const selectTime = (time: string) => setState(s => ({ ...s, time }));
  const setFormData = (formData: BookingFormData) => setState(s => ({ ...s, formData }));
  const confirmBooking = (booking: Booking) => setState(s => ({ ...s, confirmedBooking: booking, step: 5 }));
  const reset = () => setState(DEFAULT_STATE);

  return (
    <BookingContext value={{
      state,
      service: inMemoryBookingService,
      setStep,
      selectService,
      selectDate,
      selectTime,
      setFormData,
      confirmBooking,
      reset,
    }}>
      {children}
    </BookingContext>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
