json.extract! track, :id, :title, :description
json.userId   track.user_id
json.playlistId   track.playlist_id
json.playlistOrd  track.playlist_ord
json.audioUrl   track.audio.url
json.imageUrl   asset_url(track.image.url)
json.username   track.user.username
json.userImageUrl   asset_url(track.user.profile_image.url)
json.createdAt track.created_at
json.createdAtInt track.created_at.to_time.to_f * 1000
json.loadStatus "unloaded"
