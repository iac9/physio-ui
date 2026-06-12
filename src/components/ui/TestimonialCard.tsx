import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  rating: number;
  date: string;
  text: string;
  condition: string;
}

export function TestimonialCard({ name, rating, date, text, condition }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-200'}`}
            strokeWidth={1}
          />
        ))}
      </div>
      <p className="text-neutral-600 text-sm leading-relaxed flex-1">"{text}"</p>
      <div className="pt-3 border-t border-neutral-100">
        <p className="font-semibold text-neutral-800 text-sm">{name}</p>
        <p className="text-neutral-400 text-xs mt-0.5">{condition} · {date}</p>
      </div>
    </div>
  );
}
