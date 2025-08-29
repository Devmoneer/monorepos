import React, { useEffect, useState } from 'react';
import { User, Heart, Lightbulb, Code } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface AboutProps {
  currentLanguage: string;
}

const About: React.FC<AboutProps> = ({ currentLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[currentLanguage.toLowerCase() as Language] || translations['en-uk'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
              <User className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.about.title}
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-white text-6xl font-bold">M</div>
              </div>
              <div className="absolute -bottom-6 -right-3 w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center shadow-xl">
                <Code className="w-12 h-12 text-emerald-400" />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t.about.heading}
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.about.p1}
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.about.p2}
              </p>

              {/* Key Points */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Heart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.about.passion}</h4>
                    <p className="text-gray-600 text-sm">{t.about.passionDesc}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{t.about.innovation}</h4>
                    <p className="text-gray-600 text-sm">{t.about.innovationDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;