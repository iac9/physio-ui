import { useBooking } from '../../context/BookingContext';

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

export function TimeSlotGrid() {
  const { state, service: bookingService, selectTime } = useBooking();

  if (!state.service || !state.date) return null;

  const slots = bookingService.getAvailableSlots(state.date, state.service);
  const formattedDate = new Date(state.date + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-900 mb-1">Select a Time</h2>
      <p className="text-neutral-500 text-sm mb-1">
        Available slots for <span className="font-medium text-neutral-700">{formattedDate}</span>
      </p>
      <p className="text-neutral-400 text-xs mb-6">
        {state.service.name} · {state.service.duration} min session
      </p>

      {slots.length === 0 ? (
        <p className="text-neutral-500 text-sm">No slots available for this date.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.map(slot => {
            const selected = state.time === slot.time;
            return (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => selectTime(slot.time)}
                className={`py-2.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                  selected
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : !slot.available
                    ? 'bg-neutral-50 text-neutral-300 border-neutral-100 cursor-not-allowed line-through'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-primary hover:text-primary hover:bg-primary-light'
                }`}
              >
                {formatTime(slot.time)}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-4 mt-5 text-xs text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary inline-block" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-neutral-100 border border-neutral-200 inline-block" /> Unavailable
        </span>
      </div>
    </div>
  );
}
