import React, { useEffect, useState } from 'react';
import { Folder, ExternalLink, Github, Smartphone, Globe } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface ProjectsProps {
  currentLanguage: string;
}

const Projects: React.FC<ProjectsProps> = ({ currentLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[currentLanguage.toLowerCase() as Language] || translations['en-uk'];

  const projectData = [
    {
      id: 1,
      image: "https://t4.ftcdn.net/jpg/05/29/97/73/360_F_529977311_T3OyTe7H6FdLvPIvEJlxPAWnPIWdKVmf.jpg",
      technologies: ["React.js", "Node.js", "Firebase"],
      type: "Web App",
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      id: 2,
      image: "../../webprod.png",
      technologies: ["React.js"],
      type: "Web",
      icon: <Globe className="w-5 h-5" />,
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  const projects = t.projects.items.map((trans, index) => ({
    ...projectData[index],
    title: trans.title,
    description: trans.description,
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full mb-4">
              <Folder className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.projects.title}
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                    <div className="flex space-x-4">
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                        <Github className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Project Type Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-sm font-medium rounded-full flex items-center space-x-2`}>
                    {project.icon}
                    <span>{project.type}</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Projects Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl">
              {t.projects.viewMore}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;