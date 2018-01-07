json.extract! track, :id, :title, :description
json.userId = track.user_id
json.playlistId = track.playlist_id
json.playlistOrd = track.playlist_ord
json.audioUrl = track.audio.url
json.imageUrl = asset_url(track.image.url)
