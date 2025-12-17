import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, LogIn } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Search from './Search';

export default function Navbar({ onLoginClick, isLoggedIn = false, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Trang chủ', href: '#' },
    { name: 'Khuyến mãi', href: '#promotions' },
    { name: 'Câu lạc bộ', href: '#club' },
    { name: 'Liên hệ', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white shadow-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img 
              src="/logo.png" 
              alt="SmashPro Logo" 
              className="h-12 sm:h-16 lg:h-18 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button & Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search */}
            <Search />
            
            {!isLoggedIn && (
              <button 
                onClick={onLoginClick}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-orange-600 hover:text-orange-700 font-semibold border-2 border-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-300 text-sm lg:text-base"
              >
                <LogIn size={18} className="sm:w-5 sm:h-5" />
                <span className="hidden lg:inline">Đăng nhập</span>
              </button>
            )}
            
            <button 
              onClick={onCartClick}
              className="btn-primary hidden sm:flex items-center space-x-2 text-sm lg:text-base relative"
            >
              <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden lg:inline">Giỏ hàng</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 hover:text-orange-600 transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 mt-4 pt-4 pb-4">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-3 px-4 text-gray-600 hover:text-orange-600 hover:bg-orange-50 font-medium transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="px-4 mt-4 space-y-2">
              {!isLoggedIn && (
                <button 
                  onClick={() => {
                    onLoginClick();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-orange-600 font-semibold border-2 border-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-300 text-sm"
                >
                  <LogIn size={18} />
                  <span>Đăng nhập</span>
                </button>
              )}
              <button 
                onClick={() => {
                  onCartClick();
                  setIsOpen(false);
                }}
                className="btn-primary w-full flex items-center justify-center space-x-2 text-sm relative"
              >
                <ShoppingCart size={18} />
                <span>Giỏ hàng</span>
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}