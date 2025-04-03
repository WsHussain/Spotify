import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './AlbumPage.css';

function ArtistPage() {
    const { id } = useParams();
    const [artistData, setArtistData] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:8000/artists/`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => setArtistData(data))
        .catch(error => setError(error.message));
    }, [id]);
    
}

export default ArtistPage;