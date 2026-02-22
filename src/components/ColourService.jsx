import React from 'react';
import barvanjeImg1 from '../assets/barvanje_1.png'; 
import barvanjeImg2 from '../assets/barvanje_2.jpeg';
import { useLanguage } from '../context/LanguageContext'; 

const ColourService = () => {
  const { t } = useLanguage();

  return (
    <section id="barvanje" className="split-layout-section">
      
      <div className="split-text-side">
        <div className="split-header">
          <h2 className="split-title">{t.colourService.title}</h2>
          <p className="split-intro">
            {t.colourService.intro}
          </p>
        </div>

        <div className="split-content-wrapper">
          <div className="service-box">
            <h4 className="split-subtitle">{t.colourService.subtitle1}</h4>
            <ul className="custom-list">
              {t.colourService.list1.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="service-box mt-40">
            <h4 className="split-subtitle">{t.colourService.subtitle2}</h4>
            <ul className="custom-list">
              {t.colourService.list2.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="split-result">
          <span className="result-label">{t.colourService.resultLabel}</span>
          <h3 className="result-text">{t.colourService.resultText}</h3>
        </div>
      </div>

      <div className="split-image-side">
        <img src={barvanjeImg1} alt="Barvanje las zgoraj" className="split-img-half" />
        <img src={barvanjeImg2} alt="Barvanje las spodaj" className="split-img-half" />
      </div>

    </section>
  );
};

export default ColourService;