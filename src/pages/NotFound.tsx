import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-7xl font-bold text-primary/20 mb-4">404</p>
      <h1 className="text-2xl font-bold text-neutral-900 mb-2">Page Not Found</h1>
      <p className="text-neutral-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button href="/" variant="outline">Go Home</Button>
        <Button href="/book">Book an Appointment</Button>
      </div>
    </div>
  );
}
