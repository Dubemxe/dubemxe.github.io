 // Make a request to the Spotify API to search for tracks, albums, etc.
        fetch('https://api.spotify.com/v1/search?q=artist:David%20Bowie&type=track&limit=10', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer BQCLz_O-XrrQJXO6lsaKKi13Xyo2WzQtqeeuqZBmo9HEzLd7vPdXKBM0QCy-GMKLKZf_N-3a-aNm68GGFCXehhR9vBWY0t7hV9JFW8iAgFUNVJFBLahanAelCpBZIs3m-Qtb63S6M7ZaRtMVNbVgdG3k6fGIXv7Hrl__rqoByANpu_520eJIxVuJV35UcZAU7BOprJZSlAWjAA-OaJNH22I',
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
