import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero_section.png';
import { useLanguage } from '../context/LanguageContext'; 

const Hero = () => {
  const { t } = useLanguage(); 

  return (
    <header 
      className="hero-section" 
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="hero-overlay">
        <Link to="/rezervacija" className="book-btn">
          {t.hero.btn}
        </Link>
      </div>
    </header>
  );
};

export default Hero;