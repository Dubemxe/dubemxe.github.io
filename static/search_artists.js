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
      searchResultsContainer.innerHTML = "";
    const trackHTML = `
        <div>
                   <div class="div1">
    <p class="searchtxt">Search Results</p>
    <img src="styles/images/icons8-x-50 white.png" class="imgd" onclick="popupaDiv()">
      </div>

      <div class="div2">
    </div>

              <div id="divdd2">          
              <div class="imge" style="background-image: url('${artist.images[0]?.url || 'styles/images/adPic.jpg'}');">
              <div class="checkdiv">
              <input type="checkbox" class="checkerdh"> </div>
                   <div class="bdiv">
              <p class="artistname">${artist.name}</p> </div> </div> </div>
              <p class=bio>${artist.bio}</p>

    </div>
          `;
        searchResultsContainer.innerHTML += trackHTML;
   } catch (error) {
      console.error('Error fetching artist data:', error);
  }
}
document.getElementById('searchQuery').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
           document.getElementById('sBtn').click();  // Trigger search button click
  }
});
function formatFollowers(count) {
  if (count >= 1e6) {
      return (count / 1e6).toFixed(1) + 'M';
  } else if (count >= 1e3) {
      return Math.round(count / 1e3) + 'K';
  }
  return count;
}
