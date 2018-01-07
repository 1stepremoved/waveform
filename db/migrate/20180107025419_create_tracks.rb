class CreateTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :user_id, null: false
      t.integer :playlist_id
      t.integer :playlist_ord

      t.timestamps
    end

    add_index :tracks, :user_id
    add_index :tracks, [:playlist_id, :playlist_ord], unique: true
  end
end
