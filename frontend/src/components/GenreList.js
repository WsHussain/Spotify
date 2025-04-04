import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GenreList.css';

function GenresList() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/genres')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setGenres(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="genres-container">
            <h1 className="genres-title">Genres</h1>
            <ul className="genres-list">
                {genres.map(genre => (
                    <li key={genre.id} className="genre-item">
                        <Link to={`/genres/${genre.id}`} className="genre-link">
                            {genre.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GenresList;