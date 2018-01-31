json.extract! user, :id, :username, :email
json.profileImageUrl asset_url(user.profile_image.url)
json.backgroundImageUrl asset_url(user.background_image.url)
if (current_user.id == user.id)
  json.likes user.likes.map {|like| like.likeable_id}
end
