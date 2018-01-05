class RemoveColumnsFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :image_url
    remove_attachment :users, :profile_image
  end
end
