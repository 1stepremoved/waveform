json.extract! user, :id, :username, :email
json.profileImageUrl asset_url(user.profile_image.url)
json.backgroundImageUrl asset_url(user.background_image.url)
if (current_user.id == user.id)
  json.likes do
    user.likes.each do |like|
      json.set! like.id do
        json.id like.id
        json.likeable_id like.likeable_id
        json.likeable_type like.likeable_type
      end
    end
  end
end
