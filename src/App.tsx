import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"; // fixed import

function App() {
  const [language, setLanguage] = useState('KU-BA');

  return (
    <div className="min-h-screen">
      <Header currentLanguage={language} onLanguageChange={setLanguage} />
      <Hero currentLanguage={language} />
      <About currentLanguage={language} />
      <Skills currentLanguage={language} />
      <Projects currentLanguage={language} />
      <Contact currentLanguage={language} />
      <Footer currentLanguage={language} />
      <Analytics /> {/* add Analytics here */}
    </div>
  );
}-

export default App;