import React from 'react';
import nepalImg from '../assets/nepal-ritual.jpg';
import massageImg from '../assets/massage.png';
import { useLanguage } from '../context/LanguageContext';

const SpecialExperience = () => {
  const { t } = useLanguage();

  return (
    <section id="special-experience" className="special-section">
      <div className="special-container">
        
        <div className="special-header">
          <span className="special-badge">{t.specialExperience.badge}</span>
          <h2 className="special-main-title">{t.specialExperience.mainTitle}</h2>
        </div>

        <div className="special-grid">
        
          <div className="special-card">
            
            <h3 className="special-card-title">{t.specialExperience.card1_title}</h3>

            <div className="special-card-content">
              <p className="special-card-intro">
                {t.specialExperience.card1_intro}
              </p>
              
              <h4 className="special-subtitle">{t.specialExperience.card1_subtitle}</h4>
              <ul className="special-list">
                {t.specialExperience.card1_list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <div className="special-highlight">
                {t.specialExperience.card1_highlight}
              </div>
            </div>

            <div className="card-reveal-curtain">
               <img src={nepalImg} alt="Nepalski ritual" className="curtain-img" />
               <div className="curtain-overlay"></div>
            </div>
            
          </div>

          <div className="special-card">
            
            <h3 className="special-card-title">{t.specialExperience.card2_title}</h3>

            <div className="special-card-content">
              <p className="special-card-intro">
                {t.specialExperience.card2_intro}
              </p>
              
              <h4 className="special-subtitle">{t.specialExperience.card2_subtitle}</h4>
              <ul className="special-list">
                {t.specialExperience.card2_list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <div className="special-highlight">
                {t.specialExperience.card2_highlight}
              </div>
            </div>

            <div className="card-reveal-curtain">
               <img src={massageImg} alt="Masaža obraza" className="curtain-img" />
               <div className="curtain-overlay"></div>
            </div>

          </div>

        </div>

        <div className="special-footer">
          <h3 className="special-conclusion">{t.specialExperience.footer}</h3>
        </div>

      </div>
    </section>
  );
};

export default SpecialExperience;