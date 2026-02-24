import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  // NOVO: Dodano stanje za mobilni meni
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  // NOVO: Funkcije za odpiranje in zapiranje menija
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="admin-wrapper">
      
      {/* NOVO: Zgornja vrstica za mobilne telefone s hamburger menijem */}
      <div className="admin-mobile-topbar">
        <h2>ADMIN<span className="text-gold">PANEL</span></h2>
        
        <div className={`admin-hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>

      {/* SPREMENJENO: Stranskemu meniju smo dodali dinamičen class 'mobile-open' */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="admin-logo">
          <h2>ADMIN<span className="text-gold">PANEL</span></h2>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className={`admin-link ${isActive('/admin')}`} onClick={closeMenu}>
            <span className="icon">📊</span> Dashboard
          </Link>
          <Link to="/admin/rezervacije" className={`admin-link ${isActive('/admin/rezervacije')}`} onClick={closeMenu}>
            <span className="icon">📅</span> Rezervacije
          </Link>
          <Link to="/admin/blog" className={`admin-link ${isActive('/admin/blog')}`} onClick={closeMenu}>
            <span className="icon">✍️</span> Blog Edit
          </Link>
        </nav>

        <div className="admin-logout">
          <Link to="/" className="logout-btn">← Nazaj na stran</Link>
        </div>
      </aside>

      {/* NOVO: Zatemnitev ozadja, ko je meni odprt na telefonu */}
      {isMobileMenuOpen && (
        <div className="admin-menu-overlay" onClick={closeMenu}></div>
      )}

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;