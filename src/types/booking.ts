export interface Service {
  id: string;
  name: string;
  duration: number; // minutes
  description: string;
  price: number;
}

export interface TimeSlot {
  time: string; // "09:00"
  available: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  service: Service;
  date: string; // "YYYY-MM-DD"
  time: string;
  clientName: string;
  email: string;
  phone: string;
  notes?: string;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingFormData {
  clientName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface BookingState {
  step: BookingStep;
  service: Service | null;
  date: string | null;
  time: string | null;
  formData: BookingFormData;
  confirmedBooking: Booking | null;
}

export interface BookingServiceInterface {
  getServices(): Service[];
  getAvailableSlots(date: string, service: Service): TimeSlot[];
  createBooking(data: Omit<Booking, 'id'>): Promise<Booking>;
  getBookings(): Booking[];
  getBookingsByUser(userId: string): Booking[];
  cancelBooking(id: string): void;
  rescheduleBooking(id: string, date: string, time: string): Booking;
}
