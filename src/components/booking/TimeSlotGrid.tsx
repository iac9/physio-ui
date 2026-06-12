import { useBooking } from '../../context/BookingContext';
import type { TimeSlot } from '../../types/booking';

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
}

const COLUMNS: { label: string; test: (h: number) => boolean }[] = [
  { label: 'Morning',   test: h => h < 12 },
  { label: 'Afternoon', test: h => h >= 12 && h < 17 },
  { label: 'Evening',   test: h => h >= 17 },
];

function SlotButton({ slot, selected, onSelect }: { slot: TimeSlot; selected: boolean; onSelect: () => void }) {
  return (
    <button
      disabled={!slot.available}
      onClick={onSelect}
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
}

export function TimeSlotGrid() {
  const { state, service: bookingService, selectTime } = useBooking();

  if (!state.service || !state.date) return null;

  const slots = bookingService.getAvailableSlots(state.date, state.service);
  const formattedDate = new Date(state.date + 'T00:00:00').toLocaleDateString('en-AU', {
    weekday: 'long', day: 'numeric', month: 'long',
  });

  const columns = COLUMNS
    .map(col => ({
      label: col.label,
      slots: slots.filter(s => col.test(Number(s.time.split(':')[0]))),
    }))
    .filter(col => col.slots.length > 0);

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
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map(col => (
            <div key={col.label}>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">{col.label}</p>
              <div className="flex flex-col gap-2">
                {col.slots.map(slot => (
                  <SlotButton
                    key={slot.time}
                    slot={slot}
                    selected={state.time === slot.time}
                    onSelect={() => selectTime(slot.time)}
                  />
                ))}
              </div>
            </div>
          ))}
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
