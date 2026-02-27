import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminLoyalty = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', surname: '', address: '', email: '', tel_number: '', sum_spent: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem('adminToken');
    axios.get(`${import.meta.env.VITE_API_URL}/loyalty`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Napaka:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      }
      setLoading(false);
    });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: '', surname: '', address: '', email: '', tel_number: '', sum_spent: '' });
    setModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      surname: item.surname,
      address: item.address || '',
      email: item.email || '',
      tel_number: item.tel_number || '',
      sum_spent: item.sum_spent || ''
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const token = localStorage.getItem('adminToken');
    const url = editingId 
        ? `${import.meta.env.VITE_API_URL}/loyalty/${editingId}` 
        : `${import.meta.env.VITE_API_URL}/loyalty`;
    const method = editingId ? axios.put : axios.post;

    method(url, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setModalOpen(false);
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

  const handleDelete = (id) => {
    const token = localStorage.getItem('adminToken');
    if (window.confirm("Ali res želiš izbrisati to stranko?")) {
      axios.delete(`${import.meta.env.VITE_API_URL}/loyalty/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setData(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => alert("Napaka pri brisanju: " + err));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const filteredData = data.filter(item => {
    const searchStr = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchStr) ||
      item.surname.toLowerCase().includes(searchStr) ||
      (item.email && item.email.toLowerCase().includes(searchStr)) ||
      (item.tel_number && item.tel_number.toLowerCase().includes(searchStr))
    );
  });

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Loyalty Program</h1>
        <p className="admin-subtitle">Sledenje porabe strank</p>
      </header>

      <div className="loyalty-top-actions">
        <input 
          type="text" 
          placeholder="Išči po imenu, priimku ali emailu..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="loyalty-search-input"
        />
        <button onClick={handleOpenAdd} className="btn-save" style={{padding: '12px 20px'}}>+ Dodaj stranko</button>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '550px'}}>
            <h2>{editingId ? 'Uredi stranko' : 'Nova stranka'}</h2>
            
            <div className="row-inputs">
                <div style={{flex: 1}}>
                    <label>Ime *</label>
                    <input name="name" value={formData.name} onChange={handleChange} style={{width: '100%'}}/>
                </div>
                <div style={{flex: 1}}>
                    <label>Priimek *</label>
                    <input name="surname" value={formData.surname} onChange={handleChange} style={{width: '100%'}}/>
                </div>
            </div>
            
            <div className="row-inputs">
                <div style={{flex: 1}}>
                    <label>Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} style={{width: '100%'}}/>
                </div>
                <div style={{flex: 1}}>
                    <label>Telefon</label>
                    <input name="tel_number" value={formData.tel_number} onChange={handleChange} style={{width: '100%'}}/>
                </div>
            </div>

            <label>Naslov</label>
            <input name="address" value={formData.address} onChange={handleChange} />

            <label>Skupaj porabljeno (€)</label>
            <input type="number" step="0.01" name="sum_spent" value={formData.sum_spent} onChange={handleChange} />

            <div className="modal-actions">
              <button onClick={() => setModalOpen(false)} className="btn-cancel">Prekliči</button>
              <button onClick={handleSave} className="btn-save">Shrani</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">Nalaganje podatkov ...</div>
      ) : (
        <div className="table-card" style={{marginTop: '20px'}}>
          <div className="table-responsive">
            <table className="admin-table full-width">
              <thead>
                <tr>
                  <th>Stranka</th>
                  <th>Kontakt</th>
                  <th>Naslov</th>
                  <th>Poraba (€)</th>
                  <th style={{textAlign: 'right'}}>Akcije</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id}>
                    <td><div className="client-name">{item.name} {item.surname}</div></td>
                    <td>
                      <div className="contact-info">
                        {item.tel_number && <span>📞 {item.tel_number}</span>}
                        {item.email && <span>✉️ {item.email}</span>}
                      </div>
                    </td>
                    <td style={{fontSize: '0.9rem'}}>{item.address || "/"}</td>
                    <td><span className="service-badge" style={{backgroundColor: '#d5c5b3', color: '#111'}}>{item.sum_spent} €</span></td>
                    <td style={{textAlign: 'right'}}>
                      <button className="action-btn edit" onClick={() => handleEditClick(item)}>✎</button>
                      <button className="action-btn delete" onClick={() => handleDelete(item.id)}>✕</button>
                    </td>
                  </tr>
                ))}
                
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{textAlign:'center', padding:'30px'}}>
                      {searchQuery ? 'Ni najdenih strank.' : 'Ni še nobenih strank v bazi.'}
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

export default AdminLoyalty;