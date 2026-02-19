import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ColourClubService = () => {
  const { t } = useLanguage();

  return (
    <section id="colour-club" className="service-section bg-white">
      <div className="service-container">
        
        <div className="service-header">
          <h2 className="section-title">{t.colourClub.title}</h2>
          <p className="service-intro">
            {t.colourClub.intro}
          </p>
        </div>

        <div className="service-content-wrapper align-center">
          <div className="service-box">
            <h4>{t.colourClub.subtitle}</h4>
            <ul className="custom-list">
              {t.colourClub.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="service-box">
            <p className="highlight-text">
              {t.colourClub.highlight}
            </p>
          </div>
        </div>

        <div className="service-result">
          <h3 className="result-text">{t.colourClub.resultText}</h3>
        </div>

      </div>
    </section>
  );
};

export default ColourClubService;