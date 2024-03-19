// Search function to retrieve music data from the spotify api
async function searchSong() {
    try {
        const query = document.getElementById('searchQuery').value.trim();
        if (!query) {
            console.log('Please enter a song title');
            return;
        }
	// Personal access token from spotify
        const accessToken = 'BQDvx_q08OoaDIIA70QfqVWcfm9xNYwi5yGkm6TG8FM4k0a_WkPNyyZX2U-Tbd7ju_cGuDck0t0nZvkqleU6z7P2L9X8NFORETA9_q7_1RvP9zjxnO739-LI3Qh7gwEfsfX_LbTYHA-_EH5xMmmSS5kGv29UTfbCs7X4TZrroDFZGf37CEG7mB-pkLuyI2j2hsTC17IXB03Q9ez96_2-BxM';
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

        const response = await fetch(searchUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to search for the song');
        }

        const data = await response.json();
        const trackItems = data.tracks.items;

        if (trackItems.length === 0) {
            console.log('No songs found');
            return;
        }
	// Get all available response from search
        const songListHTML = trackItems.map(track => {
            const artists = track.artists.map(artist => artist.name).join(', ');
	    const audioPreview = track.preview_url ? `<audio controls><source src="${track.preview_url}" type="audio/mpeg">Your browser does not support the audio element.</audio>` : '';
            const trackHTML = `
                <div class="musicInfo">
		<img src="${track.album.images[0].url}" alt="${track.name} by ${artists}" class="albumImage">
		<p class="artistName">${artists}</p>
                    <p class="songTitle"> - ${track.name}</p>
		    ${audioPreview}
                </div>
            `;
            return trackHTML;
        }).join('');

        document.getElementById('songList').innerHTML = songListHTML;

    } catch (error) {
        console.error('Error searching for the song:', error);
    }
}
