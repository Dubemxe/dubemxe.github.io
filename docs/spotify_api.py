'''This Script will import and co nfigure te spotify api'''
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials



# Authentication
client_credentials_manager = SpotifyClientCredentials(client_id='7551c1408176449aaba62ef47bd91b80', client_secret='ce1920c6f2e04031b518aa566a75e6e1')
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

results = sp.search(q='artist:David Bowie', type='track', limit=10)
for image in track['album']['images']:
        print('Image URL:', image['url'])
