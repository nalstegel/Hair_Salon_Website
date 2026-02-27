import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Cenik = () => {
  const { t } = useLanguage();
  const pricingData = t?.pricing?.categories || [];
  
  // Začnemo z odprto 1. kategorijo (indeks 0), da desna stran na PC-ju ni prazna
  const [openCategory, setOpenCategory] = useState(0);

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const setDesktopCategory = (index) => {
    setOpenCategory(index);
  };

  return (
    <section id="cenik" className="pricing-section">
      <div className="pricing-container">
        
        <div className="pricing-header">
          <h2 className="pricing-title">{t?.pricing?.mainTitle || "Cenik"}</h2>
          <p className="pricing-subtitle">{t?.pricing?.subtitle || ""}</p>
        </div>

        {/* ==========================================
            MOBILNA VERZIJA (Harmonika) 
            ========================================== */}
        <div className="pricing-mobile-accordion">
          {pricingData.map((category, index) => (
            <div 
              className={`pricing-category ${openCategory === index ? 'open' : ''}`} 
              key={index} 
            >
              <button 
                className="category-title-btn" 
                onClick={() => toggleCategory(index)}
              >
                <span className="category-title-text">{category.title}</span>
                <span className="category-toggle-icon">▼</span>
              </button>

              {openCategory === index && (
                <ul className="pricing-list">
                  {category.items.map((item, itemIndex) => (
                    <li className="pricing-item" key={itemIndex}>
                      <span className="item-name">{item.name}</span>
                      <span className="item-leader"></span>
                      <span className="item-price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* ==========================================
            RAČUNALNIŠKA VERZIJA (Zavihki: Levo gumbi, desno cenik) 
            ========================================== */}
        <div className="pricing-desktop-layout">
          {/* LEVI STOLPEC: Gumbi */}
          <div className="pricing-sidebar">
            {pricingData.map((category, index) => (
              <button 
                key={index}
                className={`desktop-tab-btn ${openCategory === index ? 'active' : ''}`}
                onClick={() => setDesktopCategory(index)}
              >
                {category.title}
                <span className="desktop-tab-arrow">›</span>
              </button>
            ))}
          </div>
          
          {/* DESNI STOLPEC: Vsebina */}
          <div className="pricing-content-panel">
            {openCategory !== null && pricingData[openCategory] && (
              <div className="desktop-active-category">
                <h3 className="desktop-category-title">{pricingData[openCategory].title}</h3>
                <ul className="pricing-list desktop-list">
                  {pricingData[openCategory].items.map((item, itemIndex) => (
                    <li className="pricing-item" key={itemIndex}>
                      <span className="item-name">{item.name}</span>
                      <span className="item-leader"></span>
                      <span className="item-price">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Cenik;