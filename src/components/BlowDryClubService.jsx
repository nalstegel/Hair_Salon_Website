import React from 'react';
import blowDryImg from '../assets/blowdry_1.png'; 
import { useLanguage } from '../context/LanguageContext';

const BlowDryClubService = () => {
  const { t } = useLanguage();

  return (
    <section id="blow-dry-club" className="split-layout-section reverse">
      
      <div className="split-text-side">
        <div className="split-header">
          <h2 className="split-title">{t.blowDryClub.title}</h2>
          <p className="split-intro">
            {t.blowDryClub.intro}
          </p>
        </div>

        <div className="split-content-wrapper">
          <div className="service-box">
            <h4 className="split-subtitle">{t.blowDryClub.subtitle}</h4>
            <ul className="custom-list">
              {t.blowDryClub.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="split-result">
          <h3 className="result-text" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            {t.blowDryClub.resultText}
          </h3>
        </div>
      </div>

      <div className="split-image-side">
        <img src={blowDryImg} alt="Blow Dry Club feniranje" />
      </div>

    </section>
  );
};

export default BlowDryClubService;