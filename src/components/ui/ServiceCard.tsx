import { Activity, RefreshCw, Zap, Heart, Crosshair, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, LucideIcon> = {
  Activity,
  RefreshCw,
  Zap,
  Heart,
  Crosshair,
};

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  showBookCta?: boolean;
}

export function ServiceCard({ icon, title, description, price, duration, showBookCta = false }: ServiceCardProps) {
  const Icon = iconMap[icon] ?? Activity;
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-4 hover:shadow-md hover:border-primary/30 transition-all duration-300 group">
      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <h3 className="text-neutral-900 font-semibold text-lg mb-2">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
      </div>
      {(price || duration) && (
        <div className="flex items-center gap-3 text-sm text-neutral-400 pt-1 border-t border-neutral-100">
          {duration && <span>{duration}</span>}
          {price && duration && <span>·</span>}
          {price && <span className="text-primary font-medium">{price}</span>}
        </div>
      )}
      {showBookCta && (
        <Link
          to="/book"
          className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          Book this service →
        </Link>
      )}
    </div>
  );
}
