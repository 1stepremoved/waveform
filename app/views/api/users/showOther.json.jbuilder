json.extract! @user, :id, :username
json.profileImageUrl asset_url(@user.profile_image.url)
json.backgroundImageUrl asset_url(@user.background_image.url)
