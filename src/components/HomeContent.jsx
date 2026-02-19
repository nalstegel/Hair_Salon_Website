import React from 'react';
import img1 from '../assets/mladen.jpg'; 
import img2 from '../assets/jelena.jpg';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import { useLanguage } from '../context/LanguageContext';

const HomeContent = () => {
  const { t } = useLanguage(); 

  return (
    <section id="home" className="home-section">
      <div className="home-container">

        <div className="home-intro mt-spacing">
          <span className="about-label" style={{ display:'block', marginBottom:'15px', color:'#d5c5b3', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600', fontSize:'0.8rem' }}>
            {t.homeContent.labelSalon}
          </span>
          
          <h2 className="home-title">{t.homeContent.title}</h2>
          <p className="home-description">
            {t.homeContent.introDescription}
          </p>
        </div>

        <div className="home-lists-wrapper">
          <div className="home-list-box">
            <ul className="custom-list">
              <li>{t.homeContent.list1_1}</li>
              <li>{t.homeContent.list1_2}</li>
              <li>{t.homeContent.list1_3}</li>
              <li>{t.homeContent.list1_4}</li>
            </ul>
          </div>

          <div className="home-list-box">
            <h4>{t.homeContent.list2_title}</h4>
            <ul className="custom-list">
              <li>{t.homeContent.list2_1}</li>
              <li>{t.homeContent.list2_2}</li>
              <li>{t.homeContent.list2_3}</li>
              <li>{t.homeContent.list2_4}</li>
            </ul>
          </div>
        </div>
        
        <div className="image-separator-grid">
          <div className="separator-img-wrapper">
            <img src={img1} alt="Mladen" className="separator-img" />
          </div>
          <div className="separator-img-wrapper">
            <img src={img2} alt="Jelena" className="separator-img" />
          </div>
        </div>

        <div className="philosophy-box">
          <span className="philosophy-label">{t.homeContent.philosophyLabel}</span>
          <p className="philosophy-text">
            {t.homeContent.philosophyText}
          </p>
        </div>
        <div className="section-divider">
        </div>
        
        {/* --- 2. DEL --- */}
        <div className="home-intro">
          <h3 className="home-subtitle">
            {t.homeContent.historySubtitle}
          </h3>
          <p className="home-description">
            {t.homeContent.historyText}
          </p>
        </div>

        <div className="home-lists-wrapper">
          <div className="home-list-box">
            <h4>{t.homeContent.list3_title}</h4>
            <ul className="custom-list">
              <li>{t.homeContent.list3_1}</li>
              <li>{t.homeContent.list3_2}</li>
              <li>{t.homeContent.list3_3}</li>
              <li>{t.homeContent.list3_4}</li>
            </ul>
          </div>

          <div className="home-list-box">
            <h4>{t.homeContent.list4_title}</h4>
            <ul className="custom-list">
              <li>{t.homeContent.list4_1}</li>
              <li>{t.homeContent.list4_2}</li>
              <li>{t.homeContent.list4_3}</li>
              <li>{t.homeContent.list4_4}</li>
            </ul>
          </div>
        </div>
        <div className="image-separator-grid" style={{ marginTop: '60px' }}>
          <div className="separator-img-wrapper">
            <img src={product1} alt="makadamia" className="separator-img" />
          </div>
          <div className="separator-img-wrapper">
            <img src={product2} alt="13v1" className="separator-img" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HomeContent;