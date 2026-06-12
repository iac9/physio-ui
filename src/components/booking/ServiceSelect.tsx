import { Clock, DollarSign } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import type { Service } from '../../types/booking';

export function ServiceSelect() {
  const { service: bookingService, selectService, state } = useBooking();
  const services = bookingService.getServices();

  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-900 mb-1">Select a Service</h2>
      <p className="text-neutral-500 text-sm mb-6">Choose the type of appointment you need.</p>
      <div className="flex flex-col gap-3">
        {services.map((s: Service) => {
          const selected = state.service?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => selectService(s)}
              className={`w-full text-left rounded-xl border-2 p-5 transition-all duration-200 ${
                selected
                  ? 'border-primary bg-primary-light'
                  : 'border-neutral-200 bg-white hover:border-primary/40 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`font-semibold ${selected ? 'text-primary-dark' : 'text-neutral-900'}`}>{s.name}</p>
                  <p className="text-neutral-500 text-sm mt-1">{s.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-neutral-900">${s.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {s.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  ${s.price} per session
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
