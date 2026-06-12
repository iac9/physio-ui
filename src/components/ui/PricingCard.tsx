import { Check } from 'lucide-react';
import { Button } from './Button';

interface PricingCardProps {
  title: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export function PricingCard({ title, price, duration, description, features, featured = false }: PricingCardProps) {
  return (
    <div className={`rounded-2xl p-8 flex flex-col gap-6 border transition-shadow duration-300 hover:shadow-md ${
      featured
        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
        : 'bg-white border-neutral-200'
    }`}>
      {featured && (
        <span className="self-start text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white">
          Most Popular
        </span>
      )}
      <div>
        <h3 className={`text-xl font-semibold mb-1 ${featured ? 'text-white' : 'text-neutral-900'}`}>{title}</h3>
        <p className={`text-sm ${featured ? 'text-white/80' : 'text-neutral-500'}`}>{description}</p>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-4xl font-bold ${featured ? 'text-white' : 'text-neutral-900'}`}>${price}</span>
        <span className={`text-sm ${featured ? 'text-white/70' : 'text-neutral-400'}`}>/ {duration}</span>
      </div>
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${featured ? 'text-white' : 'text-primary'}`} strokeWidth={2.5} />
            <span className={`text-sm ${featured ? 'text-white/90' : 'text-neutral-600'}`}>{f}</span>
          </li>
        ))}
      </ul>
      <Button
        href="/book"
        variant={featured ? 'white' : 'primary'}
        className="w-full justify-center"
      >
        Book Now
      </Button>
    </div>
  );
}
