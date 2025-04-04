import React, { createContext, useState } from 'react';

// Création du context
export const AuthContext = createContext();

// Fournisseur du context
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // `user` contiendra les infos de l'utilisateur s'il est connecté

    // Fonction de connexion
    const login = (userData) => {
        setUser(userData); // Met à jour les infos de l'utilisateur
        localStorage.setItem('user', JSON.stringify(userData)); // Sauvegarde dans le localStorage
    };

    // Fonction de déconnexion
    const logout = () => {
        setUser(null); // Réinitialise l'état utilisateur
        localStorage.removeItem('user'); // Supprime l'utilisateur du localStorage
    };

    // Récupère l'utilisateur déjà connecté depuis localStorage au premier rendu
    React.useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser)); // Met à jour l'état utilisateur
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
