
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { WaterDropIcon, MenuIcon, CloseIcon } from './icons';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'For Farmers', path: '/farmers' },
  { name: 'Our Impact', path: '/impact' },
  { name: 'Investors', path: '/partners' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `py-2 px-3 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-primary-light text-white' : 'text-neutral-dark hover:bg-primary/10'
    }`;
  
  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block py-2 px-3 rounded-md text-base font-medium transition-colors ${
    isActive ? 'bg-primary text-white' : 'text-neutral-dark hover:bg-primary/10'
  }`;

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-extrabold text-primary-dark">
              <WaterDropIcon className="h-8 w-8 text-secondary" />
              <span>AquaGrow</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={linkClass}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
           <div className="hidden md:block">
             <Link
                to="/farmers"
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-transform transform hover:scale-105"
              >
                Join Now
              </Link>
           </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-dark hover:text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={mobileLinkClass} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </NavLink>
            ))}
             <Link
                to="/farmers"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-transform transform hover:scale-105"
              >
                Join Now
              </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
