import { CheckCircle, Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/Button';
import { useBooking } from '../../context/BookingContext';

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function BookingConfirmation() {
  const { state, reset } = useBooking();
  const b = state.confirmedBooking;
  if (!b) return null;

  const formattedDate = new Date(b.date + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="text-center py-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">Booking Confirmed!</h2>
      <p className="text-neutral-500 text-sm mb-8 max-w-sm mx-auto">
        Your appointment has been booked. A confirmation would be sent to your email in a real system.
      </p>

      <div className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 text-left mb-6">
        <p className="font-semibold text-neutral-900 mb-4 text-sm uppercase tracking-wide">Booking Summary</p>
        <div className="flex flex-col gap-3">
          <Row icon={<Calendar className="w-4 h-4 text-primary" />} label="Service" value={b.service.name} />
          <Row icon={<Calendar className="w-4 h-4 text-primary" />} label="Date" value={formattedDate} />
          <Row icon={<Clock className="w-4 h-4 text-primary" />} label="Time" value={formatTime(b.time)} />
          <Row icon={<Clock className="w-4 h-4 text-primary" />} label="Duration" value={`${b.service.duration} minutes`} />
          <div className="border-t border-neutral-200 my-1" />
          <Row icon={<User className="w-4 h-4 text-primary" />} label="Name" value={b.clientName} />
          <Row icon={<Mail className="w-4 h-4 text-primary" />} label="Email" value={b.email} />
          <Row icon={<Phone className="w-4 h-4 text-primary" />} label="Phone" value={b.phone} />
          {b.notes && <Row icon={<span className="w-4 h-4" />} label="Notes" value={b.notes} />}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button href="/" variant="outline">Back to Home</Button>
        <Button onClick={reset}>Book Another Appointment</Button>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="flex flex-1 justify-between gap-4 text-sm">
        <span className="text-neutral-500">{label}</span>
        <span className="text-neutral-800 font-medium text-right">{value}</span>
      </div>
    </div>
  );
}
