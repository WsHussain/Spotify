import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function GenreDetail() {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenreAndAlbums = async () => {
      try {
        const genreResponse = await fetch(`http://localhost:8000/genres/${id}`);
        if (!genreResponse.ok) throw new Error('Genre not found');
        const genreData = await genreResponse.json();
        setGenre(genreData);
        
        let albumIds = [];
        
        if (genreData.albums && Array.isArray(genreData.albums)) {
          albumIds = genreData.albums.filter(id => id);
        }
        
        if (albumIds.length === 0) {
          setLoading(false);
          return;
        }

        const fetchedAlbums = [];
        
        for (const albumId of albumIds) {
          try {
            const albumResponse = await fetch(`http://localhost:8000/albums/${albumId}`);
            
            if (albumResponse.ok) {
              const albumData = await albumResponse.json();
              
              if (albumData && albumData.album) {
                fetchedAlbums.push({
                  ...albumData.album,
                  hasDetails: true 
                });
              } else if (albumData && (albumData.id || albumData.name)) {
                fetchedAlbums.push({
                  ...albumData,
                  hasDetails: true
                });
              }
            }
          } catch (albumError) {
            console.error(`Error fetching album ${albumId}:`, albumError);
          }
        }
        
        setAlbums(fetchedAlbums);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreAndAlbums();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!genre) return <div>Genre not found</div>;

  return (
    <div>
      <h1>{genre.name}</h1>
      <h2>Albums ({albums.length})</h2>
      {albums.length === 0 ? (
        <p>No albums found for this genre</p>
      ) : (
        <div className="albums-grid">
          {albums.map(album => (
            <div key={album.id} className="album-card">
              <Link to={`/album/${album.id}`}>
                {album.cover_small && (
                  <img
                    src={album.cover_small}
                    alt={album.name || 'Album cover'}
                  />
                )}
                <h3>{album.name || 'Untitled Album'}</h3>
                {album.popularity && (
                  <div className="album-popularity">
                    Popularity: {album.popularity}/10
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenreDetail;