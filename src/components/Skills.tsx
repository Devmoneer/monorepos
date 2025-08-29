import React, { useEffect, useState } from 'react';
import { Code2, Palette, Smartphone, Database } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface SkillsProps {
  currentLanguage: string;
}

const Skills: React.FC<SkillsProps> = ({ currentLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);
  const t = translations[currentLanguage.toLowerCase() as Language] || translations['en-uk'];

  const skills = [
    { name: 'HTML', level: 95, icon: '🏗️', color: 'from-orange-500 to-red-500' },
    { name: 'CSS', level: 90, icon: '🎨', color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', level: 88, icon: '⚡', color: 'from-yellow-500 to-orange-500' },
    { name: 'React.js', level: 85, icon: '⚛️', color: 'from-blue-400 to-blue-600' },
    { name: 'React Native', level: 80, icon: '📱', color: 'from-purple-500 to-pink-500' },
    { name: 'Flutter', level: 78, icon: '🦋', color: 'from-blue-500 to-teal-500' },
    { name: 'Firebase', level: 82, icon: '🔥', color: 'from-yellow-600 to-red-600' },
    { name: 'UI Design', level: 75, icon: '🎭', color: 'from-pink-500 to-purple-500' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with stagger effect
          skills.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, index]);
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-4">
              <Code2 className="w-8 h-8 text-gray-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.skills.title}
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.skills.frontend}</h3>
              <p className="text-gray-600 text-sm">{t.skills.frontendDesc}</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.skills.mobile}</h3>
              <p className="text-gray-600 text-sm">{t.skills.mobileDesc}</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.skills.backend}</h3>
              <p className="text-gray-600 text-sm">{t.skills.backendDesc}</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.skills.design}</h3>
              <p className="text-gray-600 text-sm">{t.skills.designDesc}</p>
            </div>
          </div>

          {/* Skills Progress Bars */}
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                    style={{
                      width: animatedSkills.includes(index) ? `${skill.level}%` : '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;