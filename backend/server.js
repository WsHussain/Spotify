const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;


// Configuration de la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'spoty',
    password: 'spotypwd',
    database: 'spotify',
});

// Tentative de connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Échec de la connexion à la base de données:', err.stack);
        return;
    }
    console.log('Connecté à la base de données.');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint: Création d'utilisateur (inscription)
// Endpoint : Création d'utilisateur (inscription)
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    try {
        connection.query(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [email, username],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Erreur serveur.' });
                }

                if (results.length > 0) {
                    return res.status(400).json({ message: 'Nom d’utilisateur ou e-mail déjà utilisé.' });
                }

                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: 'Erreur lors du hachage du mot de passe.' });
                    }

                    connection.query(
                        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                        [username, email, hash],
                        (err, results) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ message: 'Erreur lors de l’inscription.' });
                            }

                            // Retourne les détails de l'utilisateur nouvellement inscrit
                            return res.status(201).json({
                                user: { id: results.insertId, username, email },
                                message: 'Utilisateur créé avec succès.',
                            });
                        }
                    );
                });
            }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de l’inscription.' });
    }
});
// Endpoint : Connexion utilisateur
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erreur serveur.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            const user = results[0];

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Erreur lors de la vérification du mot de passe.' });
                }

                if (!isMatch) {
                    return res.status(401).json({ message: 'Mot de passe incorrect.' });
                }

                // Retourne l'utilisateur connecté (sans le mot de passe)
                return res.status(200).json({
                    user: { id: user.id, username: user.username, email: user.email },
                    message: 'Connexion réussie.',
                });
            });
        }
    );
});
app.get('/api', (req, res) => {
    return res.send('Hello World!');
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d’exécution sur http://localhost:${port}`);
});