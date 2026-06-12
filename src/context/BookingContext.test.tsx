import { renderHook, act } from '@testing-library/react';
import { BookingProvider, useBooking, BOOKING_SERVICES } from './BookingContext';

// Use far-future dates to avoid collisions with MOCK_BOOKED (seeded for next 14 days)
const DATE_A = '2035-06-16'; // Monday
const DATE_B = '2035-06-17'; // Tuesday
const SERVICE = BOOKING_SERVICES[0]; // Initial Consultation, 60 min
const FOLLOWUP = BOOKING_SERVICES[1]; // Follow-up, 30 min

function wrapper({ children }: { children: React.ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}

describe('BookingContext', () => {
  describe('initial state', () => {
    it('starts at step 1 with no selections', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      expect(result.current.state.step).toBe(1);
      expect(result.current.state.service).toBeNull();
      expect(result.current.state.date).toBeNull();
      expect(result.current.state.time).toBeNull();
      expect(result.current.state.confirmedBooking).toBeNull();
    });
  });

  describe('selectService', () => {
    it('sets service and advances to step 2', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      expect(result.current.state.service).toBe(SERVICE);
      expect(result.current.state.step).toBe(2);
    });

    it('preserves date and time when the same service is re-selected', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      act(() => result.current.selectDate(DATE_A));
      act(() => result.current.selectTime('09:00'));
      act(() => result.current.selectService(SERVICE));
      expect(result.current.state.date).toBe(DATE_A);
      expect(result.current.state.time).toBe('09:00');
    });

    it('clears date and time when a different service is selected', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      act(() => result.current.selectDate(DATE_A));
      act(() => result.current.selectTime('09:00'));
      act(() => result.current.selectService(FOLLOWUP));
      expect(result.current.state.date).toBeNull();
      expect(result.current.state.time).toBeNull();
    });
  });

  describe('selectDate', () => {
    it('sets date and advances to step 3', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      act(() => result.current.selectDate(DATE_A));
      expect(result.current.state.date).toBe(DATE_A);
      expect(result.current.state.step).toBe(3);
    });

    it('preserves time when the same date is re-selected', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      act(() => result.current.selectDate(DATE_A));
      act(() => result.current.selectTime('09:00'));
      act(() => result.current.selectDate(DATE_A));
      expect(result.current.state.time).toBe('09:00');
    });

    it('clears time when a different date is selected', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      act(() => result.current.selectDate(DATE_A));
      act(() => result.current.selectTime('09:00'));
      act(() => result.current.selectDate(DATE_B));
      expect(result.current.state.time).toBeNull();
    });
  });

  describe('selectTime', () => {
    it('saves the time without advancing the step', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      act(() => result.current.selectDate(DATE_A));
      const stepBefore = result.current.state.step;
      act(() => result.current.selectTime('10:00'));
      expect(result.current.state.time).toBe('10:00');
      expect(result.current.state.step).toBe(stepBefore);
    });
  });

  describe('setStep', () => {
    it('navigates to any step directly', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.setStep(3));
      expect(result.current.state.step).toBe(3);
    });
  });

  describe('reset', () => {
    it('returns to default state', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      act(() => result.current.selectService(SERVICE));
      act(() => result.current.selectDate(DATE_A));
      act(() => result.current.selectTime('09:00'));
      act(() => result.current.reset());
      expect(result.current.state.step).toBe(1);
      expect(result.current.state.service).toBeNull();
      expect(result.current.state.date).toBeNull();
      expect(result.current.state.time).toBeNull();
    });
  });

  describe('getAvailableSlots', () => {
    it('generates slots spanning 9am–5pm with correct slot count for 60-min service', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      // 9:00–17:00, step 30 min, 60-min duration → last slot at 16:00 → 15 slots
      const slots = result.current.service.getAvailableSlots(DATE_A, SERVICE);
      const times = slots.map(s => s.time);
      expect(times[0]).toBe('09:00');
      expect(times[times.length - 1]).toBe('16:00');
      expect(slots.length).toBe(15);
    });

    it('generates more slots for a shorter duration service', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      // 30-min service: last slot at 16:30 → 16 slots
      const slots = result.current.service.getAvailableSlots(DATE_A, FOLLOWUP);
      expect(slots.length).toBe(16);
      expect(slots[slots.length - 1].time).toBe('16:30');
    });

    it('all slots are available for an unbooked far-future date', () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      const slots = result.current.service.getAvailableSlots(DATE_A, SERVICE);
      expect(slots.every(s => s.available)).toBe(true);
    });

    it('marks a slot unavailable after createBooking', async () => {
      const { result } = renderHook(() => useBooking(), { wrapper });
      await act(async () => {
        await result.current.service.createBooking({
          userId: 'test-user',
          service: SERVICE,
          date: DATE_B,
          time: '11:00',
          clientName: 'Test User',
          email: 'test@example.com',
          phone: '0400000000',
          notes: '',
        });
      });
      const slots = result.current.service.getAvailableSlots(DATE_B, SERVICE);
      const bookedSlot = slots.find(s => s.time === '11:00');
      expect(bookedSlot?.available).toBe(false);
    });
  });
});
