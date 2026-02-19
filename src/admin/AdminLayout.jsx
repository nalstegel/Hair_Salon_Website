import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>ADMIN<span className="text-gold">PANEL</span></h2>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className={`admin-link ${isActive('/admin')}`}>
            <span className="icon">📊</span> Dashboard
          </Link>
          <Link to="/admin/rezervacije" className={`admin-link ${isActive('/admin/rezervacije')}`}>
            <span className="icon">📅</span> Rezervacije
          </Link>
          {/* ODKOMENTIRANO IN POVEZANO */}
          <Link to="/admin/blog" className={`admin-link ${isActive('/admin/blog')}`}>
            <span className="icon">✍️</span> Blog Edit
          </Link>
        </nav>

        <div className="admin-logout">
          <Link to="/" className="logout-btn">← Nazaj na stran</Link>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;