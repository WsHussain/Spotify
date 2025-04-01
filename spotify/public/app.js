async function fetchAlbums() {
    try {
        const response = await fetch('http://localhost:8000/api/albums');
        const albums = await response.json();
        displayAlbums(albums);
    } catch (error) {
        console.error('Error fetching albums:', error);
    }
}

function displayAlbums(albums) {
    const container = document.getElementById('albums-container');
    
    albums.forEach(album => {
        const albumCard = document.createElement('div');
        albumCard.className = 'album-card';
        
        albumCard.innerHTML = `
            <img src="${album.cover_image || 'https://via.placeholder.com/200'}" class="album-cover" alt="${album.name}">
            <h3 class="album-title">${album.name}</h3>
            <p class="album-artist">${album.artist}</p>
        `;
        
        container.appendChild(albumCard);
    });
}

window.addEventListener('load', fetchAlbums);
