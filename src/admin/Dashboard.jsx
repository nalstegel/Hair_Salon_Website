import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    recent: []
  });


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    axios.get(`${import.meta.env.VITE_API_URL}/rezervacija`, { 
        headers: {
            Authorization: `Bearer ${token}`
        }
    }) 
      .then(res => {
        if(Array.isArray(res.data)) {
          setStats({
            total: res.data.length,
            recent: res.data.slice(0, 5) 
          });
        }
      })
      .catch(err => {
        console.error("Napaka pri nalaganju dashboarda:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            localStorage.removeItem('adminToken');
            window.location.href = '/login';
        }
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "/";
    const date = new Date(dateString);
    return date.toLocaleDateString('sl-SI');
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Pregled rezervacij & blogov</h1>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Vse rezervacije</h3>
          <p className="stat-number">{stats.total}</p>
          <span className="stat-desc">Prejetih naročil</span>
        </div>
        
        <div className="stat-card">
          <h3>Blog objave</h3>
          <p className="stat-number">0</p>
          <span className="stat-desc">Kmalu na voljo</span>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Zadnjih 5 naročil</h2>
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ime</th>
                <th>Storitev</th>
                <th>Datum</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.length > 0 ? (
                stats.recent.map((item) => (
                  <tr key={item.id}>
                    <td style={{fontWeight:'bold'}}>{item.name}</td>
                    <td>{item.service}</td>
                    <td>{formatDate(item.date)}</td>
                    <td><span className="status-badge new">Novo</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">Ni podatkov.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;