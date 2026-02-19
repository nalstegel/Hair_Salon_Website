import React from "react";
import { useLanguage } from '../context/LanguageContext'; 

const Gifts_Darila = () => {
    const { t } = useLanguage(); 

    return (
        <>
        <section id="darilni-boni" className="split-layout-section">
            
            <div className="split-text-side">
                <div className="split-header">
                <span className="about-label" style={{ color: '#d5c5b3', display: 'block', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '20px' }}>
                    {t.gifts.perfectGifts}
                </span>
                <p className="split-intro" style={{ fontSize: '1.4rem', color: '#111111', fontStyle: 'italic' }}>
                    {t.gifts.intro}
                </p>
                </div>

                <div className="split-content-wrapper">
                <div className="service-box">
                    <h4 className="split-subtitle">{t.gifts.subtitle}</h4>
                    <ul className="custom-list">
                    {t.gifts.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                    </ul>
                </div>
                </div>

                <div className="split-result">
                <h3 className="result-text" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                    {t.gifts.result}
                </h3>
                </div>
            </div>

            {/* <div className="split-image-side">...</div> */}
            </section>
        </>
    )
}

export default Gifts_Darila;