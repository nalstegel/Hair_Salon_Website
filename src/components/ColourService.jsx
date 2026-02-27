import React from 'react';
import barvanjeImg1 from '../assets/barvanje_1.png'; 
import barvanjeImg2 from '../assets/barvanje_2.jpeg';
import { useLanguage } from '../context/LanguageContext'; 

const ColourService = () => {
  const { t } = useLanguage();

  return (
    <div id="barvanje" className="colour-service-wrapper">
      
      <section className="split-layout-section">
        <div className="split-text-side">
          <div className="split-header">
            <h2 className="split-title">{t.colourService.title}</h2>
            <p className="split-intro">{t.colourService.intro}</p>
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

      <section className="service-container centered-container packages-spacing">
        <div className="packages-section">
          <h3 className="packages-title">{t.colourService.packagesTitle}</h3>
          
          <div className="packages-grid packages-grid-two">
            {t.colourService.packages.map((pkg, index) => (
              <div key={index} className={`package-card ${pkg.isPremium ? 'premium' : ''}`}>
                <h4 className="package-name">{pkg.name}</h4>
                <div className="package-price-wrap">
                  <span className="package-price">{pkg.price}</span>
                  <span className="package-period">{pkg.period}</span>
                </div>
                
                {pkg.subtitle && <div className="package-subtitle">{pkg.subtitle}</div>}

                <ul className="package-features">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
                
                <p className="package-note">{pkg.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ColourService;