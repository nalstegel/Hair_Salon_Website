import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../admin.css';

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('sl'); 
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    date: '', category: '', image: '',
    title_sl: '', excerpt_sl: '', content_sl: '',
    title_it: '', excerpt_it: '', content_it: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/blog`)
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  };

  const handleAuthError = (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
    } else {
        alert("Napaka: " + (err.response?.data || err.message));
    }
  };

  const handleDelete = (id) => {
    if(!window.confirm("Res želite izbrisati ta članek?")) return;
    const token = localStorage.getItem('adminToken');
    axios.delete(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setPosts(prev => prev.filter(p => p.id !== id)))
    .catch(handleAuthError);
  };

  const handleSave = () => {
    const token = localStorage.getItem('adminToken');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    
    const url = editingItem.id 
        ? `${import.meta.env.VITE_API_URL}/blog/${editingItem.id}`
        : `${import.meta.env.VITE_API_URL}/blog/`;
    
    const method = editingItem.id ? axios.put : axios.post;

    method(url, formData, headers)
        .then(() => {
            setEditingItem(null);
            fetchPosts();
        })
        .catch(handleAuthError);
  };

  const openNewModal = () => {
    setEditingItem({});
    setActiveTab('sl');
    setFormData({ 
        date: '', category: '', image: '',
        title_sl: '', excerpt_sl: '', content_sl: '',
        title_it: '', excerpt_it: '', content_it: ''
    });
  };

  const openEditModal = (post) => {
    setEditingItem(post);
    setActiveTab('sl');
    setFormData({
        date: post.date, category: post.category, image: post.image,
        title_sl: post.title_sl, excerpt_sl: post.excerpt_sl, content_sl: post.content_sl,
        title_it: post.title_it || '', excerpt_it: post.excerpt_it || '', content_it: post.content_it || ''
    });
  };

  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="admin-page">
      <header className="admin-header-flex">
        <div>
            <h1>Urejanje Bloga</h1>
            <p className="admin-subtitle">Dodajanje in urejanje člankov (SL / IT).</p>
        </div>
        <button className="btn-primary" onClick={openNewModal}>+ Dodaj Članek</button>
      </header>

      {/* MODALNO OKNO */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal-container">
            
            {/* GLAVA MODALA */}
            <div className="modal-header">
                <h2>{editingItem.id ? 'Uredi članek' : 'Nov članek'}</h2>
                <button className="close-btn" onClick={() => setEditingItem(null)}>×</button>
            </div>

            {/* VSEBINA MODALA */}
            <div className="modal-body">
                
                {/* 1. SKUPNI PODATKI */}
                <div className="form-section">
                    <h3 className="form-subtitle">Osnovni podatki</h3>
                    <div className="form-grid-3">
                        <div className="form-group">
                            <label>Datum (tekst)</label>
                            <input className="form-input" name="date" value={formData.date} onChange={handleChange} placeholder="npr. 12. OKT 2024" />
                        </div>
                        <div className="form-group">
                            <label>Kategorija</label>
                            <input className="form-input" name="category" value={formData.category} onChange={handleChange} placeholder="npr. Nega" />
                        </div>
                        <div className="form-group">
                            <label>URL Slike</label>
                            <input className="form-input" name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                        </div>
                    </div>
                </div>

                {/* 2. ZAVIHKI (TABS) */}
                <div className="tabs-container">
                    <button 
                        className={`tab-btn ${activeTab === 'sl' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('sl')}
                    >
                        🇸🇮 Slovenščina
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'it' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('it')}
                    >
                        🇮🇹 Italiano
                    </button>
                </div>

                {/* 3. VNOSNA POLJA (SL) */}
                <div className={`tab-content ${activeTab === 'sl' ? 'show' : ''}`}>
                    <div className="form-group">
                        <label>Naslov (SL)</label>
                        <input className="form-input" name="title_sl" value={formData.title_sl} onChange={handleChange} placeholder="Slovenski naslov" />
                    </div>
                    <div className="form-group">
                        <label>Kratek uvod (Excerpt SL)</label>
                        <textarea className="form-textarea short" name="excerpt_sl" value={formData.excerpt_sl} onChange={handleChange} placeholder="Kratek uvod za prikaz na kartici..." />
                    </div>
                    <div className="form-group">
                        <label>Vsebina (SL - HTML)</label>
                        <textarea className="form-textarea long" name="content_sl" value={formData.content_sl} onChange={handleChange} placeholder="<p>Vsebina članka...</p>" />
                        <span className="input-hint">Uporabljaj HTML značke (p, h3, strong...)</span>
                    </div>
                </div>

                {/* 3. VNOSNA POLJA (IT) */}
                <div className={`tab-content ${activeTab === 'it' ? 'show' : ''}`}>
                    <div className="form-group">
                        <label>Naslov (IT)</label>
                        <input className="form-input" name="title_it" value={formData.title_it} onChange={handleChange} placeholder="Titolo italiano" />
                    </div>
                    <div className="form-group">
                        <label>Kratek uvod (Excerpt IT)</label>
                        <textarea className="form-textarea short" name="excerpt_it" value={formData.excerpt_it} onChange={handleChange} placeholder="Breve descrizione..." />
                    </div>
                    <div className="form-group">
                        <label>Vsebina (IT - HTML)</label>
                        <textarea className="form-textarea long" name="content_it" value={formData.content_it} onChange={handleChange} placeholder="<p>Contenuto in italiano...</p>" />
                         <span className="input-hint">Usa tag HTML (p, h3, strong...)</span>
                    </div>
                </div>

            </div>

            {/* NOGA MODALA (Gumbi) */}
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setEditingItem(null)}>Prekliči</button>
              <button className="btn-primary" onClick={handleSave}>Shrani spremembe</button>
            </div>

          </div>
        </div>
      )}

      {/* SEZNAM ČLANKOV */}
      <div className="table-card">
        <table className="admin-table full-width">
            <thead>
                <tr>
                    <th style={{width:'80px'}}>Slika</th>
                    <th>Naslov (SL)</th>
                    <th>Datum</th>
                    <th>Kategorija</th>
                    <th style={{textAlign:'right'}}>Akcije</th>
                </tr>
            </thead>
            <tbody>
                {posts.map(post => (
                    <tr key={post.id}>
                        <td>
                            <img src={post.image} alt="" className="table-img" />
                        </td>
                        <td className="table-title">{post.title_sl}</td>
                        <td className="table-date">{post.date}</td>
                        <td><span className="service-badge">{post.category}</span></td>
                        <td style={{textAlign:'right'}}>
                            <button className="action-btn edit" onClick={() => openEditModal(post)}>✎</button>
                            <button className="action-btn delete" onClick={() => handleDelete(post.id)}>✕</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;