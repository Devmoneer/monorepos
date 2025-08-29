import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface FooterProps {
  currentLanguage: string;
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const t = translations[currentLanguage.toLowerCase() as Language] || translations['en-uk'];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-gray-400 py-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-3 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold text-emerald-400 mb-2">
              Moneer Developer
            </div>
            <p className="text-sm">
              {t.footer.subtitle}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <span>{t.footer.madeWith}</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>{t.footer.by}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm">
          <p>
            {t.footer.passion}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;