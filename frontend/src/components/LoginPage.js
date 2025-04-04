import React, { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
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
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user); // Mets à jour l'état global de l'utilisateur
                navigate('/home'); // Redirige après connexion
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setError('Une erreur est survenue.');
        }
    };

    return (
        <div className="App">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Se connecter</button>
            </form>
            <yLink to="/register"> S'inscrire</yLink>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Login;