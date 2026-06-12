import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || value;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => i + 1).map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              star <= active ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
            }`}
            strokeWidth={1}
          />
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm text-neutral-500">
          {['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][value]}
        </span>
      )}
    </div>
  );
}
