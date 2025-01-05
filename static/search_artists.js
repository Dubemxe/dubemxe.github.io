function popupDiv() {

  const contentDiv = document.getElementById('searchbackDiv');

  // Toggle the visibility of the div
  if (contentDiv.style.display === 'none' || contentDiv.style.display === '') {
    contentDiv.style.display = 'block'; // Show the div
  } else {
    contentDiv.style.display = 'none'; // Hide the div
  }
}

async function searchArtist() {
  // Get the artist's name from the input field
  const artistQuery = document.getElementById('artistSearchInput').value.trim();

  // Check if input is empty
  if (!artistQuery) {
      alert('Please enter an artist name');
      return;
  }

  // Spotify API URL for searching artists
  const searchUrl = `https://v1.nocodeapi.com/jmusic3/spotify/webvybGfTcWRBfis/search?q=${encodeURIComponent(artistQuery)}&type=artist`;
  // Fetch the artist's data
  try {
      const response = await fetch(searchUrl);
     if (!response.ok) {
          throw new Error('Failed to fetch artist data');
      }

      const data = await response.json();
      const artist = data.artists.items[0];

      // If no artist is found
      if (!artist) {
          alert('No artist found. Please try a different name.');
          return;
      }
      // Update the Search Results section
      const searchResultsContainer =  const trackHTML = `
        const artistId = `${artist.id}`;
                <div class="search_back">
              <div class="div1">
    <p class="searchtxt">Search Results</p>
    <img src="styles/images/icons8-x-50 white.png" class="imgd">
      </div>
      <div class="div2">
      <p class="select">select</p><input type="checkbox" class="checker">
    </div>
      <div class="div2">
              <img src="${artist.images[0].url}" alt="${artist.name}" class="imge">
              <p class="artistname">${artist.name}</p>
                 </div>
              <p class="figtxt">${formatFollowers(artist.followers.total)} Monthly Listeners</p>
             
              <span>i ${`https://v1.nocodeapi.com/jmusic3/spotify/webvybGfTcWRBfis/artists/${artistId}`}</span>
              
          </div> `;
          return trackHTML;
        }).join('');

        document.getElementById('searchbackDiv').innerHTML = songListHTML;
   } catch (error) {
      console.error('Error fetching artist data:', error);
  }
}

function formatFollowers(count) {
  if (count >= 1e6) {
      return (count / 1e6).toFixed(1) + 'M';
  } else if (count >= 1e3) {
      return Math.round(count / 1e3) + 'K';
  }
  return count;
}
