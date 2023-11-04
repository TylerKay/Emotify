import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask

# creates flask server
app = Flask(__name__)
@app.route('/api/hello', methods=['GET'])

# function to print onto /api/hello
def hello():
    return "Hello World!"

#function to print onto /api/create-playlist
@app.route('/api/create-playlist', methods=['GET'])
def CreateSpotifyPlaylist():
    # sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id='b82386d0a887488a927060be6dce7148', client_secret='e8c91cd0e7ea471aa30785a538ed0833',redirect_uri='YOUR_REDIRECT_URI',scope='user-library-read'))
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id='b82386d0a887488a927060be6dce7148',
                                                client_secret='e8c91cd0e7ea471aa30785a538ed0833',
                                                redirect_uri='http://localhost:8888/callback',
                                                scope='user-library-read playlist-modify-private'))

    # client_id = 'b82386d0a887488a927060be6dce7148' # replace with your client id
    # client_secret = 'e8c91cd0e7ea471aa30785a538ed0833' # replace with your client secret

    # client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
    # sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    valence_score = 0.95  # Adjust this to your desired valence score

    # Replace 'your_genre' with a genre that you want the recommendations to be based on. You can also use 
    # other seed parameters like seed_artists and seed_tracks to further refine your recommendations.
    genre = 'k-pop'
    recommendations = sp.recommendations(seed_genres=[genre], target_valence=valence_score, limit=5)
    playlist_name = 'RECOMMENDED PLAYLIST: ' + genre 
    playlist_description = 'A playlist based on your valence score.'
    user_id = '1237543937'  # Your Spotify user ID

    playlist = sp.user_playlist_create(sp.me()['id'], name=playlist_name, public=False, description=playlist_description)
    print("test3")

    track_uris = [track['uri'] for track in recommendations['tracks']]
    sp.user_playlist_add_tracks(user_id, playlist['id'], track_uris)

    #Replace 'your_user_id' with your Spotify user ID, and adjust the playlist name and description as needed.

if __name__ == '__main__':
    app.run(debug=True)