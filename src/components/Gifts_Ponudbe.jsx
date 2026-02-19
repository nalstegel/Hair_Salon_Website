import React from "react";
import { useLanguage } from '../context/LanguageContext';

const Gifts_Ponudbe = () => {
    const { t } = useLanguage(); 

    return (
        <>
        <section id="ponudbe" className="offers-section">
        <div className="offers-container">
          
          <span className="about-label" style={{ marginBottom: '15px' }}>{t.gifts.benefitsLabel}</span>
          <h2 className="section-title">{t.gifts.offersTitle}</h2>

          <div className="offers-content-box">
            <ul className="custom-list offers-list">
              {t.gifts.offersList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
        </div>
      </section>
      </>
    )
}

export default Gifts_Ponudbe;