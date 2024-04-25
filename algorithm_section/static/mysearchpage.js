// Search function to retrieve music data from the spotify api
async function searchSong() {
    try {
        const query = document.getElementById('searchQuery').value.trim();
        if (!query) {
            console.log('Please enter a song title');
            return;
        }
	// Personal access token from spotify
        const accessToken = 'BQD_EY5XjDVKd6JBPhOvL0IpRdUeoW477tzEl_ik0Ci45r8cLaXSMlG3zTayaW-xeUDFPxegEvlbalCggCiy19PkXWaeqeO4YygguvBfv4Tmh7N0I94xBwf6-HnjsOcpjRQX-SSM9wzJlRS43S432mL70FpEt7oiou4euVRNIuy9XxZVHTrPlKCZHV7juVBalU9WdKZFfTFXTFN9ieGwUUc';
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
           const accessToken = 'BQD_EY5XjDVKd6JBPhOvL0IpRdUeoW477tzEl_ik0Ci45r8cLaXSMlG3zTayaW-xeUDFPxegEvlbalCggCiy19PkXWaeqeO4YygguvBfv4Tmh7N0I94xBwf6-HnjsOcpjRQX-SSM9wzJlRS43S432mL70FpEt7oiou4euVRNIuy9XxZVHTrPlKCZHV7juVBalU9WdKZFfTFXTFN9ieGwUUc';

    // Encode the artist name for use in the URL
    const encodedArtistName = encodeURIComponent(artistName);

    // Construct the search URL for tracks by the artist
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodedArtistName}&type=track`;

    // Make a GET request to the search URL with the Spotify API access token
    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch tracks by artist');
    }

    // Parse the response JSON
    const data = await response.json();

    // Extract the track IDs from the response
    const trackIds = data.tracks.items.map(item => item.id);

    // Return the array of track IDs
    //console.log("First tracks:", trackIds);
    return trackIds;
  } catch (error) {
    console.error('Error fetching track IDs by artist:', error);
    return [];
  }
}


async function fetchWithCORSProxy(url) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const response = await fetch(proxyUrl + url, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest' // Some proxy services require this header
    }
  });
  return await response.json();
}

async function getSongInfoAndAudioPreview(trackId) {
  try {
    const accessToken = 'BQD_EY5XjDVKd6JBPhOvL0IpRdUeoW477tzEl_ik0Ci45r8cLaXSMlG3zTayaW-xeUDFPxegEvlbalCggCiy19PkXWaeqeO4YygguvBfv4Tmh7N0I94xBwf6-HnjsOcpjRQX-SSM9wzJlRS43S432mL70FpEt7oiou4euVRNIuy9XxZVHTrPlKCZHV7juVBalU9WdKZFfTFXTFN9ieGwUUc';
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch track info');
    }

    const trackData = await response.json();
    const trackInfo = await fetchWithCORSProxy(url);
    return trackInfo;

    // Extract song information
    const songTitle = trackData.name;
    const artistName = trackData.artists.map(artist => artist.name).join(', ');
    const albumName = trackData.album.name;
    const audioPreviewUrl = trackData.preview_url;

    // Display song information
    console.log('Song Title:', songTitle);
    console.log('Artist:', artistName);
    console.log('Album:', albumName);
    console.log('Audio Preview URL:', audioPreviewUrl);

      // Play audio preview if available
    if (audioPreviewUrl) {
      const audio = new Audio(audioPreviewUrl);
      audio.play();
    } else {
      console.log('No audio preview available for this track');
    }
  } catch (error) {
    console.error('Error fetching track info:', error);
  }
}
// Example usage
const artistName = 'Drake';
const topTracks = getTrackIdsByArtist(artistName);
getSongInfoAndAudioPreview(topTracks);
