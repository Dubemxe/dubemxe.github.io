function popupaDiv() {

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
  const searchUrl = `https://v1.nocodeapi.com/jmusic4/spotify/kibKUujvhYKHJxPL/search?q=${encodeURIComponent(artistQuery)}&type=artist`;
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
          console.log('No artist found. Please try a different name.');
          return;
      }
      // Update the Search Results section
      const searchResultsContainer = document.getElementById('searchbackDiv');
        const trackHTML = `
        <div>
                   <div class="div1">
    <p class="searchtxt">Search Results</p>
    <img src="styles/images/icons8-x-50 white.png" class="imgd">
      </div>
      <div class="div2">
      <input type="checkbox" class="checker">
    </div>
                
      <div class="divdd2">          
              <div class="imge" style="background-image: url('${artist.images[0]?.url || 'styles/images/adPic.jpg'}');">
              <p class="artistname">${artist.name}</p>
              <p class="figtxt">${formatFollowers(artist.followers.total)} Monthly Listeners</p> </div> </div>

           
            <div class="div3"> 
              <p>"</p> <p class=bio>${artist.bio}</p>
              <p>"</p>
              </div>
      </div>
          `;
       searchResultsContainer.innerHTML += trackHTML;
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
