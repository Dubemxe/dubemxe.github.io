// Function to fetch track information
async function fetchTrackInfo(trackId) {
  try {
    const accessToken = 'BQB9z0fo06hY9QRwaTQCn5ZlKHzLqOFSiL0fWpk7Lmbn1mq-wTcLmnhmcOcdzToWbxe0mxqAxJL9kuj8kDM4KzUiMOfuu4dPTPIOmCK44A2NzIcf9niKxYXTbQ5A6-rSvHDaLdVsN31ae6HeBTrt7HD89wbPojOcZtq0WmkiUv9i2MON5QpZXN3advpBaupJfHmbZSolhscbY_-eVB2aDfE';
    const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch track info');
    }

    const trackData = await response.json();
    return trackData;
  } catch (error) {
    console.error('Error fetching track info:', error);
    return null;
  }
}


