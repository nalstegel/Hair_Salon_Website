import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Cenik = () => {
  const { t } = useLanguage();
  
  
  const pricingData = t?.pricing?.categories || [];

  return (
    <section id="cenik" className="pricing-section">
      <div className="pricing-container">
        
        <div className="pricing-header">
          <h2 className="pricing-title">{t?.pricing?.mainTitle || "Cenik"}</h2>
          <p className="pricing-subtitle">{t?.pricing?.subtitle || ""}</p>
        </div>

        <div className="pricing-grid">
          {pricingData.map((category, index) => (
            <div 
              className="pricing-category" 
              key={index} 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="category-title">{category.title}</h3>
              <ul className="pricing-list">
                {category.items.map((item, itemIndex) => (
                  <li className="pricing-item" key={itemIndex}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-leader"></span>
                    <span className="item-price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Cenik;