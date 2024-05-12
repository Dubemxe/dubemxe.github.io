// Search function to retrieve music data from the spotify api
async function searchSong() {
    try {
        const query = document.getElementById('searchQuery').value.trim();
        if (!query) {
            console.log('Please enter a song title');
            return;
        }
	// Personal nocodeapi url
        const searchUrl = `https://v1.nocodeapi.com/joppa/spotify/yHjrDWjfpijJHOni/search?q=${encodeURIComponent(query)}&type=track`; //`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;

        const response = await fetch(searchUrl);

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
                </div>
            `; // ${audioPreview}
            return trackHTML;
        }).join('');

        document.getElementById('songList').innerHTML = songListHTML;

    } catch (error) {
        console.error('Error searching for the song:', error);
    }
}

async function getTrackIdsByArtist(artistName) {
  try {

    // Encode the artist name for use in the URL
    const encodedArtistName = encodeURIComponent(artistName);

    // Construct the search URL for tracks by the artist
    const searchUrl = `https://v1.nocodeapi.com/joppa/spotify/yHjrDWjfpijJHOni/search?q=${encodedArtistName}&type=track`;

    // Make a GET request to the search URL with the Spotify API access token
    const response = await fetch(searchUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch tracks by artist');
    }

    // Parse the response JSON
    const data = await response.json();

    // Extract the track IDs from the response
    let trackIds = data.tracks.items.map(item => item.id);

    trackIds = trackIds.slice(0, 5);

    // Return the array of track IDs
    return trackIds;
  } catch (error) {
    console.error('Error fetching track IDs by artist:', error);
    return [];
  }
}


async function getSongInfo() {
  try {

      const accessToken = 'BQCY7mQAjmQUIwdc9yz6TXJQOZ0l30Roq8xcqUuwt10_t59EJ10AYpsncVm0OOFqmrq5QKYQqSELwU8a-ohJch8sCW0UYO2ieirhacokK-fz5LWgntoEbie_fIbpHtPg0xnBVyQhfgs4_TK9Ytct8Pu0mj-5nKMltvgPE_mnqpOe2KMdkPKYvBSr42IZPJB2zNunPvXHd8Lq_KAMyzVev3o';

    // get ID with my function
    const trackIds= await getTrackIdsByArtist('Drake', 'Davido');
    
    const songInfoPromises = trackIds.map(async (trackId) => {
	    const trackInfoUrl =  /*`https://v1.nocodeapi.com/dubemxe/spotify/XBAzAzXdTbTjVcPt/tracks/${trackId}`;*/`https://api.spotify.com/v1/tracks/${trackId}`;
	    const response = await fetch(trackInfoUrl, {
		    headers: {
			    Authorization: `Bearer ${accessToken}`
      }
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch song info');
    }

    // Parse the response JSON
    const data = await response.json();
    const artistsR = data.artists.map(artist => artist.name).join(', ');
    // Extract the song information from the response
    const songInfoHTML = `
    	<div class="musicInfo">
	<img src="${data.album.images[0].url}" alt="${data.name} by ${artistsR}" class="albumImage">
      <p class="artistName">${data.artists.map(artist => artist.name).join(', ')}</p>
      <p class="songTitle">${data.name}</p>
      <p class="duration">${msToTime(data.duration_ms)}</p>
      </div>
		`;
    // Return the song information
    return songInfoHTML;
    });

    const songInfos = await Promise.all(songInfoPromises);
    return songInfos;
    } catch (error) {
    console.error('Error fetching song info:', error);
    return [];
  }
}
function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

// Example usage
getSongInfo()
  .then(songInfoHTML => {
    if (songInfoHTML) {
	document.getElementById('songList').innerHTML = songInfoHTML;
      // Use the retrieved song information as needed
    } else {
      console.log('Failed to fetch song info');
    }
  });

