import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      console.log("Pošiljam podatke:", { username, password });

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username,
        password
      });

      console.log("Odgovor strežnika:", res.data);

      if (res.data.success) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin');
      } else {
        setError(res.data.message || 'Prijava zavrnjena.');
      }

    } catch (err) {
      console.error("Podrobnosti napake:", err);
      
      if (err.response) {
        // Strežnik je odgovoril, a s statusom izven 2xx (npr. 401, 404, 500)
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
        
        if (err.response.status === 401) {
            setError("Napačno uporabniško ime ali geslo (401).");
        } else if (err.response.status === 404) {
            setError("API točka ne obstaja (404). Preveri URL.");
        } else if (err.response.status === 500) {
            setError("Napaka na strežniku (500). Preveri backend loge.");
        } else {
            setError(`Napaka: ${err.response.status}`);
        }
      } else if (err.request) {
        console.log("Ni odgovora od strežnika:", err.request);
        setError("Strežnik se ne odziva (Network Error). Preveri CORS ali URL.");
      } else {
        setError("Neznana napaka: " + err.message);
        }
    }
    }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Admin Prijava</h2>
        
        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label>Uporabnik</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Geslo</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Prijavi se</button>
        </form>
      </div>
    </div>
  );
};

// Preprost CSS-in-JS za login (lahko premakneš v CSS datoteko)
const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', 
    height: '100vh', backgroundColor: '#f0f2f5'
  },
  card: {
    width: '350px', padding: '40px', backgroundColor: 'white', 
    borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  inputGroup: { marginBottom: '15px' },
  input: {
    width: '100%', padding: '10px', marginTop: '5px', 
    border: '1px solid #ccc', borderRadius: '4px'
  },
  button: {
    width: '100%', padding: '12px', backgroundColor: '#111', 
    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: {
    color: 'red', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center'
  }
};

export default Login;