import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/react';
import { useBooking } from '../../context/BookingContext';
import type { BookingFormData } from '../../types/booking';

export function BookingForm() {
  const { state, setFormData, confirmBooking, service: bookingService } = useBooking();
  const { userId } = useAuth();
  const { user, isLoaded } = useUser();
  const [form, setForm] = useState<BookingFormData>(state.formData);

  // Pre-fill from Clerk profile for empty fields only (preserves any manual edits)
  useEffect(() => {
    if (!isLoaded || !user) return;
    setForm(f => ({
      clientName: f.clientName || [user.firstName, user.lastName].filter(Boolean).join(' '),
      email: f.email || user.primaryEmailAddress?.emailAddress || '',
      phone: f.phone || user.primaryPhoneNumber?.phoneNumber || '',
      notes: f.notes,
    }));
  }, [isLoaded, user]);
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<BookingFormData> = {};
    if (!form.clientName.trim()) e.clientName = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    setFormData(form);
    try {
      const booking = await bookingService.createBooking({
        userId: userId ?? 'guest',
        service: state.service!,
        date: state.date!,
        time: state.time!,
        clientName: form.clientName,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
      });
      confirmBooking(booking);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (
    id: keyof BookingFormData,
    label: string,
    type = 'text',
    required = true,
    placeholder = ''
  ) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={form[id]}
        onChange={ev => setForm(f => ({ ...f, [id]: ev.target.value }))}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:ring-2 focus:ring-primary/30 ${
          errors[id] ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-white hover:border-neutral-300 focus:border-primary'
        }`}
      />
      {errors[id] && <p className="mt-1 text-xs text-red-500">{errors[id]}</p>}
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-900 mb-1">Your Details</h2>
      <p className="text-neutral-500 text-sm mb-6">Fill in your contact information to confirm the booking.</p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {field('clientName', 'Full Name', 'text', true, 'Jane Smith')}
        {field('email', 'Email Address', 'email', true, 'jane@example.com')}
        {field('phone', 'Phone Number', 'tel', true, '04XX XXX XXX')}

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Notes <span className="text-neutral-400 font-normal">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Any relevant medical history or notes for the physio..."
            rows={3}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors hover:border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full bg-primary text-white rounded-lg py-3 text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60"
        >
          {submitting ? 'Confirming...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
