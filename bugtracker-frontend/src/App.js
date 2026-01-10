import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [proiecte, setProiecte] = useState([]); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //Login
      const response = await axios.post('https://bugtracking-cache-me-if-you-can.onrender.com/api/auth/login', {
        email: email,
        parola: parola
      });
      
      const token = response.data.token;
      setMesaj('Logat cu succes!');

      // Cerem lista de proiecte folosind Token-ul
      const proiecteResponse = await axios.get('https://bugtracking-cache-me-if-you-can.onrender.com/api/proiecte', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProiecte(proiecteResponse.data);
    } catch (error) {
      console.error(error);
      setMesaj('Eroare: ' + (error.response?.data?.message || 'Eroare la autentificare sau incarcare date'));
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
      <h1>BugTracker - Management</h1>
      
      {proiecte.length === 0 ? (
        <form onSubmit={handleLogin} style={{ display: 'inline-block', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Autentificare</h3>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
          <input type="password" placeholder="Parola" value={parola} onChange={(e) => setParola(e.target.value)} required /><br /><br />
          <button type="submit" style={{ cursor: 'pointer', padding: '10px 20px' }}>Login</button>
        </form>
      ) : (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
          <h3>Lista Proiecte:</h3>
          <ul style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            {proiecte.map((p) => (
              <li key={p.id_proiect} style={{ marginBottom: '10px' }}>
                <strong>{p.nume}</strong> - <a href={p.url} target="_blank" rel="noreferrer">GitHub</a>
              </li>
            ))}
          </ul>
          <button onClick={() => setProiecte([])} style={{ marginTop: '20px' }}>Logout</button>
        </div>
      )}
      
      {mesaj && <p style={{ color: 'red', marginTop: '20px' }}>{mesaj}</p>}
    </div>
  );
}

export default App;