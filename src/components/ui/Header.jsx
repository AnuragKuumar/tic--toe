import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage-gaming-platform-hub', icon: 'Home' },
    { name: 'Game Arena', path: '/game-arena-live-gameplay-interface', icon: 'Gamepad2' },
    { name: 'Login', path: '/authentication-portal-secure-access-gateway', icon: 'LogIn' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-game border-b border-border">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/homepage-gaming-platform-hub" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center strategic-transition hover:scale-105">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-primary-foreground"
                  >
                    <path
                      d="M3 3h6v6H3V3zm0 8h6v6H3v-6zm8-8h6v6h-6V3zm0 8h6v6h-6v-6z"
                      fill="currentColor"
                      opacity="0.8"
                    />
                    <path
                      d="M5 5h2v2H5V5zm0 8h2v2H5v-2zm8-8h2v2h-2V5zm0 8h2v2h-2v-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full pulse-indicator"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">TicTacToe Arena</h1>
                <p className="text-xs text-muted-foreground font-mono">Strategic Gaming</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg strategic-transition ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full pulse-indicator"></div>
              <span className="font-mono">1,247 online</span>
            </div>
            <Button variant="default" size="sm" iconName="Play" iconPosition="left">
              Play Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted strategic-transition"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg strategic-transition ${
                    isActivePath(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile CTA Section */}
              <div className="pt-4 border-t border-border mt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-success rounded-full pulse-indicator"></div>
                    <span className="font-mono">1,247 players online</span>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="default" 
                  fullWidth 
                  iconName="Play" 
                  iconPosition="left"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Playing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;