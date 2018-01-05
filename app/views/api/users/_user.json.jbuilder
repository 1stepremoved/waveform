json.extract! user, :id, :username, :email
json.image_url asset_url(user.profile_image.url)
