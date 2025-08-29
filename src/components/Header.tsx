import React, { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const t = translations[currentLanguage.toLowerCase() as Language] || translations['en-uk'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageChange = (language: string) => {
    onLanguageChange(language);
    setIsLanguageDropdownOpen(false);
  };

  const navLinks = [
    { name: t.header.home, id: 'hero' },
    { name: t.header.about, id: 'about' },
    { name: t.header.skills, id: 'skills' },
    { name: t.header.projects, id: 'projects' },
    { name: t.header.contact, id: 'contact' },
  ];

  const languages = [
    { code: 'KU-BA', name: 'Badini' },
    { code: 'EN-UK', name: 'English' },
    { code: 'AR', name: 'Arabic' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors"
            onClick={() => scrollToSection('hero')}
          >
            Moneer Developer
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Language Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
              >
                <Languages size={20} className="mr-1" />
                <span className="uppercase">{currentLanguage}</span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currentLanguage.toLowerCase() === language.code.toLowerCase()
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-emerald-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
            <nav className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium py-2"
                >
                  {link.name}
                </button>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-gray-400 text-sm font-medium mb-2">{t.header.language}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`px-4 py-2 text-sm rounded ${
                        currentLanguage.toLowerCase() === language.code.toLowerCase()
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;