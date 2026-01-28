import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '#' },
  { label: 'Our Work', path: '#' },
  { label: 'About', path: '#' },
  { label: 'Service Areas', path: '#' },
  { label: 'Contact', path: '#' },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex items-stretch bg-primary">
        {/* Logo Section */}
        <Link 
          to="/" 
          className="flex items-center justify-center bg-foreground px-4 py-3"
        >
          <img 
            src={logo} 
            alt="B40 Agency Logo" 
            className="h-16 w-16 object-contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-1 items-center justify-between px-6">
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path
                      ? 'text-primary-foreground'
                      : ''
                  }`}
                >
                  {item.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            to="/"
            className="hidden items-center justify-center rounded-md border-2 border-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary md:inline-flex"
          >
            LET'S GET STARTED
          </Link>

          {/* Mobile Menu Button */}
          <button className="p-2 text-primary-foreground md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
