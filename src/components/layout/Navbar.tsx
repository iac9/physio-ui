import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SignInButton, Show, UserButton } from '@clerk/react';
import { Button } from '../ui/Button';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-neutral-600 hover:text-neutral-900'}`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-neutral-100' : 'bg-white'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="font-bold text-neutral-900 text-base tracking-tight">Huy Hua</span>
          <span className="text-primary text-xs font-medium tracking-wide">Physiotherapy</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Sign in
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Button href="/book" size="sm">Book Now</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-100 px-4 pb-4 flex flex-col gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `block py-3 text-sm font-medium border-b border-neutral-50 last:border-0 transition-colors ${
                  isActive ? 'text-primary' : 'text-neutral-700'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mt-3 flex items-center justify-between gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Button href="/book" size="sm" className="flex-1 justify-center" onClick={() => setMenuOpen(false)}>
              Book Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
