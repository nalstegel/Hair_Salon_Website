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

        <div className="packages-section">
          <h3 className="packages-title">{t.colourClub.packagesTitle}</h3>
          
          <div className="packages-grid">
            {t.colourClub.packages.map((pkg, index) => (
              <div key={index} className={`package-card ${pkg.isPremium ? 'premium' : ''}`}>
                <h4 className="package-name">{pkg.name}</h4>
                <div className="package-price-wrap">
                  <span className="package-price">{pkg.price}</span>
                  <span className="package-period">{pkg.period}</span>
                </div>
                
                <ul className="package-features">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex}>{feature}</li>
                  ))}
                </ul>
                
                <p className="package-note">{pkg.note}</p>
              </div>
            ))}
          </div>
          <div className="why-choose-club">
            <h4 className="why-choose-title">{t.colourClub.whyChooseTitle}</h4>
            <ul className="why-choose-list">
              {t.colourClub.whyChooseList.map((item, index) => (
                <li key={index}>✓ {item}</li>
              ))}
            </ul>
            <p className="club-footer-slogan">{t.colourClub.footerSlogan}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColourClubService;