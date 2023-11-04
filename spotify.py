import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, request
from flask_cors import CORS

# creates flask server
app = Flask(__name__)
CORS(app)

# function to print onto /api/hello
@app.route('/api/hello', methods=['GET'])
def hello():
    parameter1 = request.args.get('valence_score')
    print(parameter1)
    return "Hello World!"

#function to print onto /api/create-playlist
@app.route('/api/create-playlist', methods=['GET'])
def CreateSpotifyPlaylist():
    valence_score = request.args.get('valence_score')
    # valence_score = 0.5
    genre = 'metal'

    # sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='b82386d0a887488a927060be6dce7148', client_secret='e8c91cd0e7ea471aa30785a538ed0833',redirect_uri='YOUR_REDIRECT_URI',scope='user-library-read'))
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id='980f3d478b7b4692991c81d636accdc1',
                                                client_secret='701ef9e9a9784fc78bcad9822b46c281',
                                                redirect_uri='http://localhost:8888/callback',
                                                scope='user-library-read playlist-modify-private'))

    recommendations = sp.recommendations(seed_genres=[genre], target_valence=valence_score, limit=5)
    playlist_name = 'Recommended Playlist: ' + genre 
    playlist_description = 'A playlist based on your valence score.'
    user_id = '1237543937'  # Your Spotify user ID

    playlist = sp.user_playlist_create(sp.me()['id'], name=playlist_name, public=False, description=playlist_description)
    # print("test3")


    track_uris = [track['uri'] for track in recommendations['tracks']]
    sp.user_playlist_add_tracks(user_id, playlist['id'], track_uris)

    #Replace 'your_user_id' with your Spotify user ID, and adjust the playlist name and description as needed.

    # # Define the playlist URI
    playlist_uri = playlist["uri"]
    

    # # Extract the playlist ID from the URI
    playlist_id = playlist_uri.split(':')[-1]

    # Fetch the playlist data
    playlist = sp.playlist(playlist_id)

    tracks = []
    # Extract and print the song data from the playlist
    for track in playlist['tracks']['items']:
        trackObj = {
            "name": track['track']['name'],
            "artist": track['track']['artists'][0]['name']
        }
        tracks.append(trackObj)
        # print(track['track']['name'], "by", track['track']['artists'][0]['name'])
        # tracks.append(track['track']['name'], track['track']['artists'][0]['name'])
#   
    return str(tracks)
    # return str(tracks)
if __name__ == '__main__':
    app.run(debug=True)