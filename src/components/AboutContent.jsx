import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutContent = () => {
  const { t } = useLanguage();

  return (
    <>
    <section id="o-nas" className="about-section">
          <div className="about-container">
              <div className="about-text-col">
                  <h1 className="about-title">{t.aboutContent.title}</h1>

                  <p className="about-lead">
                      {t.aboutContent.lead}
                  </p>

                  <p className="about-paragraph">
                      {t.aboutContent.paragraph1}
                  </p>

                  {/* Poseben okvirček za prvi seznam */}
                  <div className="about-list-box">
                      <h4 className="about-subtitle">{t.aboutContent.subtitle1}</h4>
                      <ul className="custom-list">
                          {t.aboutContent.list1.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                  </div>

                  <p className="about-paragraph">
                      {t.aboutContent.paragraph2}
                  </p>

                  {/* Temen, luksuzen poudarek na koncu */}
                  <div className="about-highlight">
                      <h4 className="about-subtitle">{t.aboutContent.subtitle2}</h4>
                      <ul className="custom-list">
                          {t.aboutContent.list2.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                  </div>

              </div>
          </div>
      </section>

      <section id="izkusnje" className="achievements-section">
              <div className="achievements-container">

                  <div className="achievements-grid">
                      <ul className="custom-list achievements-list">
                          {t.aboutContent.achievementsList.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                      </ul>
                  </div>

                  <h3 className="achievements-conclusion">{t.aboutContent.conclusion}</h3>
              </div>
          </section>

    <section id="kariera" className="career-section bg-white">
    <div className="career-container">
        
        <div className="career-header">
        <span className="about-label">{t.aboutContent.joinUs}</span>
        <p className="career-intro">{t.aboutContent.careerIntro}</p>
        </div>

        <div className="career-content">
        <h4 className="about-subtitle">{t.aboutContent.offerSubtitle}</h4>
        <ul className="custom-list career-list">
            {t.aboutContent.offerList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
        
        <a href="mailto:info@mitjasalon.si?subject=Prijava na delovno mesto" className="career-btn">
            {t.aboutContent.applyBtn}
        </a>
        </div>

    </div>
    </section>
    </>
  );
};

export default AboutContent;