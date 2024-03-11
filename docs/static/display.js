 // Make a request to the Spotify API to search for tracks, albums, etc.
        fetch('https://api.spotify.com/v1/search?q=artist:David%20Bowie&type=track&limit=10', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer BQC-ZqbS8nw8K7KlQxOyFoWXjq0u4O5r8FEjUplGutRDKBd_pPykXiSF31COpwB2eGkqFRqSQEhLaz5CxO7lUIwrlcOshZcpzZAYMZ0WLcOvYsZf0QKlljeCmSDB0pZGHVQ0cRs-4XoPTHrhUvCLkMefIKWq8Ps-LQhd8i1-wojyRaH9XYwPfufSqWjqzw7QdIMdh4w7yx7xYgoHbfg',n
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const imagesContainer = document.getElementById('images');

            // Iterate through the results and extract the image URLs
            data.tracks.items.forEach(track => {
                track.album.images.forEach(image => {
                    // Create an <img> element for each image and append it to the container
                    const img = document.createElement('img');
                    img.src = image.url;
                    imagesContainer.appendChild(img);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
