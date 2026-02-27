import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { useLanguage } from '../context/LanguageContext'; 

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const { language, switchLanguage, t } = useLanguage(); 

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', changeNavbarColor);
    return () => window.removeEventListener('scroll', changeNavbarColor);
  }, []);


  const navItems = [
    { title: t.navbar.home, link: "/" }, 
    {
      title: t.navbar.salon, 
      link: "/storitve", 
      dropdown: [
        { title: t.navbar.coloring, link: "/storitve#barvanje" },
        { title: t.navbar.colorClub, link: "/storitve#colour-club" },
        { title: t.navbar.blowDry, link: "/storitve#blow-dry-club" },
        { title: t.navbar.special, link: "/storitve#special-experience" },
        { title: t.navbar.pricing, link: "/storitve#cenik" }
      ]
    },
    { 
        title: t.navbar.about, 
        link: "/o-nas",
        dropdown: [
            { title: t.navbar.about, link: "/o-nas#o-nas" }, 
            { title: t.navbar.experience, link: "/o-nas#izkusnje" },
            { title: t.navbar.career, link: "/o-nas#kariera" }
        ]
    },
    { 
        title: t.navbar.gifts, 
        link: "/darila",
        dropdown: [
            { title: t.navbar.giftCards, link: "/darila#darilni-boni" },
            { title: t.navbar.offers, link: "/darila#ponudbe" }
        ]
    },
    { title: t.navbar.blog, link: "/blog" },
    { title: t.navbar.booking, link: "/rezervacija", isButton: true }
  ];

  const onMouseEnter = (index) => {
    if (window.innerWidth >= 960) setActiveDropdown(index);
  };

  const onMouseLeave = () => {
    if (window.innerWidth >= 960) setActiveDropdown(null);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left-group">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            <img src={logoImg} alt="Mitja Salon" className="logo-image" />
          </Link>
        </div>

        <div className="language-switch">
          <span 
            className={`lang-link ${language === 'sl' ? 'active' : ''}`} 
            onClick={() => switchLanguage('sl')}
            style={{cursor: 'pointer'}}
          >
            <img src="https://flagcdn.com/w20/si.png" alt="SLO" className="lang-flag" />
            <span style={{marginLeft: '5px'}}>SLO</span>
          </span>
          
          <span className="lang-separator">|</span>
          
          <span 
            className={`lang-link ${language === 'it' ? 'active' : ''}`} 
            onClick={() => switchLanguage('it')}
            style={{cursor: 'pointer'}}
          >
            <img src="https://flagcdn.com/w20/it.png" alt="ITA" className="lang-flag" />
            <span style={{marginLeft: '5px'}}>ITA</span>
          </span>
        </div>

      </div>

      <div className="menu-icon" onClick={handleClick}>
        <div className={click ? 'hamburger active' : 'hamburger'}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      <ul className={click ? 'navbar-links active' : 'navbar-links'}>
        {navItems.map((item, index) => {
            if (item.isButton) {
                return (
                  <li key={index} className="nav-item">
                    <button className="nav-book-btn" 
                      onClick={() => {
                        closeMobileMenu();
                        setShowPhoneModal(true);
                      }}
                    >
                      {item.title}
                    </button>
                  </li>
                );
              }
    
              if (item.dropdown) {
                return (
                  <li 
                    key={index} 
                    className="nav-item has-dropdown"
                    onMouseEnter={() => onMouseEnter(index)}
                    onMouseLeave={onMouseLeave}
                  >
                    <Link to={item.link} className="nav-link" onClick={closeMobileMenu}>
                      {item.title} <i className='fas fa-caret-down' />
                    </Link>
                    {activeDropdown === index && (
                        <ul className="dropdown-menu">
                            {item.dropdown.map((subItem, subIndex) => (
                            <li key={subIndex}>
                                <Link to={subItem.link} onClick={closeMobileMenu}>
                                {subItem.title}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    )}
                  </li>
                );
              }
    
              return (
                <li key={index} className="nav-item">
                  <Link to={item.link} className="nav-link" onClick={closeMobileMenu}>
                    {item.title}
                  </Link>
                </li>
              );
        })}
      </ul>

      {showPhoneModal && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="modal-content phone-modal-content">
            <h2 className="phone-modal-title">{t.popUp.title}</h2>
            
            <p className="phone-modal-text">
              {t.popUp.text}
            </p>
            
            <a href="tel:+38657313320" className="phone-modal-link">
              📞 +386 5 731 33 20
            </a>

            <div className="phone-modal-actions">
              <button onClick={() => setShowPhoneModal(false)} className="btn-secondary">
                {t.popUp.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;