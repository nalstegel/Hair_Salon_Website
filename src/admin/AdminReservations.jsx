import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReservations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', expert: '', date: '', time: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem('adminToken');
    axios.get(`${import.meta.env.VITE_API_URL}/rezervacija`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Napaka:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
             localStorage.removeItem('adminToken'); // NUJNO: Izbriši potekel token
             window.location.href = '/login';
        }
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('adminToken');
    if (window.confirm("Ali res želiš izbrisati to rezervacijo?")) {
      axios.delete(`${import.meta.env.VITE_API_URL}/rezervacija/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
        .then(() => {
          setData(prev => prev.filter(item => item.id !== id));
        })
        .catch(err => {
            // Dodana varnost tudi pri brisanju
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                localStorage.removeItem('adminToken');
                window.location.href = '/login';
            } else {
                alert("Napaka pri brisanju: " + err);
            }
        });
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      phone: item.phone,
      service: item.service,
      expert: item.expert || '',
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
      time: item.time ? item.time.toString().substring(0, 5) : ''
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem('adminToken');
    axios.put(`${import.meta.env.VITE_API_URL}/rezervacija/${editingItem.id}`, formData, {
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
      .then(() => {
        setEditingItem(null);
        fetchData();
      })
      .catch(err => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            localStorage.removeItem('adminToken');
            window.location.href = '/login';
        } else {
            alert("Napaka pri shranjevanju!");
        }
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "/";
    const d = new Date(dateString);
    return d.toLocaleDateString('sl-SI');
  };

  const formatTime = (timeString) => {
    if (!timeString) return "/";
    return timeString.toString().substring(0, 5);
  };

  const formatFullDate = (isoDate) => {
    if (!isoDate) return "/";
    const d = new Date(isoDate);
    return d.toLocaleDateString('sl-SI') + ' ob ' + d.toLocaleTimeString('sl-SI', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Upravljanje Rezervacij</h1>
        <p className="admin-subtitle">Seznam vseh prejetih spletnih naročil.</p>
      </header>

      {editingItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Uredi rezervacijo</h2>
            
            <label>Stranka</label>
            <input name="name" value={formData.name} onChange={handleChange} />
            <label>Kontakt</label>
            <input name="phone" value={formData.phone} onChange={handleChange} />
            <label>Storitev</label>
            <input name="service" value={formData.service} onChange={handleChange} />
            <label>Strokovnjak</label>
            <input name="expert" value={formData.expert} onChange={handleChange} />
            <div className="row-inputs">
                <div style={{flex: 1}}>
                    <label>Datum</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} style={{width: '100%'}}/>
                </div>
                <div style={{flex: 1}}>
                    <label>Ura</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} style={{width: '100%'}}/>
                </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => setEditingItem(null)} className="btn-cancel">Prekliči</button>
              <button onClick={handleSave} className="btn-save">Shrani</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">Nalaganje podatkov ...</div>
      ) : (
        <div className="table-card">
          <div className="table-responsive">
            <table className="admin-table full-width">
              <thead>
                <tr>
                  <th>Stranka</th>
                  <th>Kontakt</th>
                  <th>Storitev</th>
                  <th>Strokovnjak</th> 
                  <th>Datum termina</th>
                  <th>Ura</th>
                  <th>Oddano</th>
                  <th style={{textAlign: 'right'}}>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td><div className="client-name">{item.name}</div></td>
                    <td><div className="contact-info"><span>📞 {item.phone}</span></div></td>
                    <td><span className="service-badge">{item.service}</span></td>
                    <td><span style={{fontWeight: '500'}}>{item.expert || "/"}</span></td>
                    <td>{formatDate(item.date)}</td>
                    <td>{formatTime(item.time)}</td>
                    <td style={{fontSize: '0.85rem', color: '#666'}}>{formatFullDate(item.created_at)}</td>
                    <td style={{textAlign: 'right'}}>
                      <button className="action-btn edit" onClick={() => handleEditClick(item)}>✎</button>
                      <button className="action-btn delete" onClick={() => handleDelete(item.id)}>✕</button>
                    </td>
                  </tr>
                ))}
                
                {data.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{textAlign:'center', padding:'30px'}}>
                      Ni še nobenih rezervacij v bazi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;