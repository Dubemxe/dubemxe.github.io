function changeUrl(url) {
                window.location.href = url;
                }
// get info function
async function getArtistInfo(artistName) {
  try {
     // Encode the artist name for use in the URL
        const encodedArtistName = encodeURIComponent(artistName);
    // Construct the search URL for tracks by the artist    
        const searchUrl = `https://v1.nocodeapi.com/vivalog/spotify/WAwCeOnCnQHWrEVP/search?q=${encodeURIComponent(artistName)}&type=artist`;


    const response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch artist info');
    }

    const searchData = await response.json();
    const artist = searchData.artists.items[0];
    if (!artist) {
      return '<div>Artist not found</div>';
    }

    const artistInfoHTML = `
      <div>
        <img src="${artist.images[0].url}" alt="${artist.name}" class="artist_image">

        <h2 class="name">${artist.name}</h2>
        <p class="followers">Followers: ${artist.followers.total}</p>
         <p class="rating">Rating: ${artist.popularity}</p>
      </div>
    `;

    return artistInfoHTML;
  } catch (error) {
    console.error('Error fetching artist info:', error);
    return '<div>Error fetching artist info</div>';
  }
}

// Use put the display in  div1

const artistName = 'Drake';
const artistInfoDiv = document.getElementById('artistInfo');

getArtistInfo(artistName)
  .then(artistInfoHTML => {
    artistInfoDiv.innerHTML = artistInfoHTML;
  });

// for div2
const artistName2 = 'Davido';
const artistInfoDiv2 = document.getElementById('artistInfo2');

getArtistInfo(artistName2)
  .then(artistInfoHTML => {
    artistInfoDiv2.innerHTML = artistInfoHTML;
  });

// for div3
const artistName3 = '21';
const artistInfoDiv3 = document.getElementById('artistInfo3');

getArtistInfo(artistName3)
  .then(artistInfoHTML => {
    artistInfoDiv3.innerHTML = artistInfoHTML;
  });
// for div4
const artistName4 = 'Juice Wrld';
const artistInfoDiv4 = document.getElementById('artistInfo4');

getArtistInfo(artistName4)
  .then(artistInfoHTML => {
    artistInfoDiv4.innerHTML = artistInfoHTML;
  });

// for div5
const artistName5 = 'Tyler';
const artistInfoDiv5 = document.getElementById('artistInfo5');

getArtistInfo(artistName5)
  .then(artistInfoHTML => {
    artistInfoDiv5.innerHTML = artistInfoHTML;
  });

// for div6
const artistName6 = 'Gunna';
const artistInfoDiv6 = document.getElementById('artistInfo6');

getArtistInfo(artistName6)
  .then(artistInfoHTML => {
    artistInfoDiv6.innerHTML = artistInfoHTML;
  });
                 
