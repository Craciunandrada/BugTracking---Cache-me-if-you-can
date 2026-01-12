import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [parola, setParola] = useState('');
    const [mesaj, setMesaj] = useState('');
    const [proiecte, setProiecte] = useState([]);
    const [selectedProiect, setSelectedProiect] = useState(null);
    const [descriereBug, setDescriereBug] = useState('');
    const [prioritate, setPrioritate] = useState('Medie'); // Starea pentru prioritate
    const [buguri, setBuguri] = useState([]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMesaj('Se încarcă...');
        try {
            const response = await axios.post('https://bugtracking-cache-me-if-you-can.onrender.com/api/auth/login', { email, parola });
            const token = response.data.token;
            localStorage.setItem('token', token);

            const proiecteResponse = await axios.get('https://bugtracking-cache-me-if-you-can.onrender.com/api/proiecte', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProiecte(proiecteResponse.data);
            setMesaj('');
        } catch (error) {
            setMesaj('Eroare: Date incorecte.');
        }
    };

    const fetchBuguri = async (idProiect) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://bugtracking-cache-me-if-you-can.onrender.com/api/buguri/proiect/${idProiect}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBuguri(response.data);
        } catch (error) {
            console.error("Eroare la preluare bug-uri", error);
        }
    };

    const handleSelectProiect = (p) => {
        setSelectedProiect(p);
        fetchBuguri(p.id_proiect);
    };

    const handleAddBug = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('https://bugtracking-cache-me-if-you-can.onrender.com/api/buguri/raportare', {
                id_proiect: selectedProiect.id_proiect,
                descriere_bug: descriereBug,
                prioritate: prioritate, // Trimitem prioritatea selectata
                severitate: 'Medie',
                link_commit: ''
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDescriereBug('');
            fetchBuguri(selectedProiect.id_proiect);
            alert('Bug raportat cu succes!');
        } catch (error) {
            alert('Eroare la trimiterea bug-ului.');
        }
    };

    return (
        <div className="container">
            <h1>BugTracker Dashboard</h1>
            {proiecte.length === 0 ? (
                <div className="login-form">
                    <h3>Autentificare</h3>
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Parola" value={parola} onChange={(e) => setParola(e.target.value)} required />
                        <button type="submit">Intră în cont</button>
                    </form>
                    {mesaj && <p style={{ color: 'red' }}>{mesaj}</p>}
                </div>
            ) : (
                <div className="content">
                    {!selectedProiect ? (
                        <div>
                            <h3>Lista Proiecte</h3>
                            {proiecte.map((p) => (
                                <div key={p.id_proiect} className="proiect-item">
                                    <span>{p.nume}</span>
                                    <button onClick={() => handleSelectProiect(p)}>Vezi Detalii</button>
                                </div>
                            ))}
                            <button onClick={() => setProiecte([])} className="btn-logout">Logout</button>
                        </div>
                    ) : (
                        <div className="details">
                            <button onClick={() => setSelectedProiect(null)}>← Înapoi</button>
                            <h2>Proiect: {selectedProiect.nume}</h2>

                            <div className="bug-form-container">
                                <h4>Raportează Bug Nou</h4>
                                <textarea
                                    value={descriereBug}
                                    onChange={(e) => setDescriereBug(e.target.value)}
                                    placeholder="Descriere problemă..."
                                />

                                <label>Prioritate: </label>
                                <select value={prioritate} onChange={(e) => setPrioritate(e.target.value)}>
                                    <option value="Mica">Mică</option>
                                    <option value="Medie">Medie</option>
                                    <option value="Mare">Mare</option>
                                </select>

                                <button onClick={handleAddBug} style={{ display: 'block', marginTop: '10px' }}>Trimite Bug</button>
                            </div>

                            <div className="bug-list-container">
                                <h4>Bug-uri Raportate la acest proiect:</h4>
                                {buguri.length === 0 ? <p>Nu sunt bug-uri încă.</p> : (
                                    <ul>
                                        {buguri.map(b => (
                                            <li key={b.id_bug} className="bug-item">
                                                <span className={`priority-${b.prioritate.toLowerCase()}`}>[{b.prioritate}]</span> {b.descriere_bug} - <em>{b.status}</em>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
export default App;