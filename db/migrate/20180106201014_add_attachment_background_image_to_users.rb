class AddAttachmentBackgroundImageToUsers < ActiveRecord::Migration[5.1]
  def self.up
    change_table :users do |t|
      t.attachment :background_image
    end
  end

  def self.down
    remove_attachment :users, :background_image
  end
end
