import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero_section.png';
import { useLanguage } from '../context/LanguageContext'; 

const Hero = () => {
  const { t } = useLanguage(); 
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  return (
    <header 
      className="hero-section" 
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="hero-overlay">
        <button 
          onClick={() => setShowPhoneModal(true)} 
          className="book-btn"
        >
          {t.hero.btn}
        </button>
      </div>

      {showPhoneModal && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content phone-modal-content">
            <h2 className="phone-modal-title">{t.popUp.title}</h2>
            
            <p className="phone-modal-text">
              {t.popUp.text}
            </p>
            
            <a href="tel:+38657313320" className="phone-modal-link">
              📞 +386 5 731 33 20
            </a>

            <div className="phone-modal-actions">
              <button onClick={() => setShowPhoneModal(false)} className="btn-secondary">
                {t.popUp.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Hero;