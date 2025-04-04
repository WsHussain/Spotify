import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Accédez à la fonction login du AuthContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); // Mets à jour l'état global de l'utilisateur
        navigate('/home'); // Redirige après inscription
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error);
      setError('Une erreur est survenue.');
    }
  };

  return (
      <div className="App">
        <h1>Créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Entrez votre nom d'utilisateur"
                required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Entrez votre email"
                required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                required
            />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
  );
}

export default Register;