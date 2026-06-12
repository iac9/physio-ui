import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function CalendarPicker() {
  const { selectDate, state } = useBooking();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const canGoPrev = new Date(year, month - 1, 1) >= new Date(today.getFullYear(), today.getMonth(), 1);

  const toKey = (day: number) => {
    const d = new Date(year, month, day);
    return d.toISOString().slice(0, 10);
  };

  const isWeekend = (day: number) => {
    const dow = new Date(year, month, day).getDay();
    return dow === 0 || dow === 6;
  };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    return d < today;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-900 mb-1">Select a Date</h2>
      <p className="text-neutral-500 text-sm mb-6">Available Monday – Friday only.</p>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="p-1.5 rounded-lg hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>
          <p className="font-semibold text-neutral-900">{MONTHS[month]} {year}</p>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-neutral-100">
          {DAYS.map(d => (
            <div key={d} className="py-2 text-center text-xs font-medium text-neutral-400">
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 p-3 gap-1">
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const key = toKey(day);
            const disabled = isWeekend(day) || isPast(day);
            const selected = state.date === key;
            return (
              <button
                key={key}
                disabled={disabled}
                onClick={() => selectDate(key)}
                className={`aspect-square w-full rounded-lg text-sm font-medium transition-all duration-150 ${
                  selected
                    ? 'bg-primary text-white shadow-sm'
                    : disabled
                    ? 'text-neutral-300 cursor-not-allowed'
                    : 'text-neutral-700 hover:bg-primary-light hover:text-primary'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {state.date && (
        <p className="mt-3 text-sm text-primary font-medium">
          Selected: {new Date(state.date + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      )}
    </div>
  );
}
