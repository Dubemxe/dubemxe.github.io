function changeUrl(url) {
                window.location.href = url;
                }
// get info function
async function getArtistInfo(artistName) {
  try {
    const accessToken = 'BQDvx_q08OoaDIIA70QfqVWcfm9xNYwi5yGkm6TG8FM4k0a_WkPNyyZX2U-Tbd7ju_cGuDck0t0nZvkqleU6z7P2L9X8NFORETA9_q7_1RvP9zjxnO739-LI3Qh7gwEfsfX_LbTYHA-_EH5xMmmSS5kGv29UTfbCs7X4TZrroDFZGf37CEG7mB-pkLuyI2j2hsTC17IXB03Q9ez96_2-BxM';
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`;

    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artist info');
    }

    const searchData = await response.json();
    const artist = searchData.artists.items[0];
    if (!artist) {
      return '<div>Artist not found</div>';
    }
    // Handle the display in HTML format
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
