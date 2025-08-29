import React, { useEffect, useState } from 'react';
import { Code, Smartphone } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface HeroProps {
  currentLanguage: string;
}

const Hero: React.FC<HeroProps> = ({ currentLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[currentLanguage.toLowerCase() as Language] || translations['en-uk'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22%234B5563%22 fill-opacity=%220.05%22 fill-rule=%22evenodd%22%3E%3Cpath d=%22M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Content */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-6 flex justify-center space-x-4">
            <div className="p-3 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <Code className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <Smartphone className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {t.hero.greeting} <span className="text-emerald-400">Moneer</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
            {t.hero.title}
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t.hero.aboutButton}
            </button>
            
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-emerald-500 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500 hover:text-white transform hover:-translate-y-1 transition-all duration-200"
            >
              {t.hero.contactButton}
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button 
            onClick={scrollToAbout}
            className="animate-bounce text-gray-400 hover:text-emerald-400 transition-colors"
          >         
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;