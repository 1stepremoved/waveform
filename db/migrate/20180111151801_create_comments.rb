class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.integer :user_id, null: false
      t.integer :item_id, null: false
      t.integer :parent_id
      t.integer :timestamp, null: false
      t.timestamps
    end

    add_index :comments, :user_id
    add_index :comments, :item_id
    add_index :comments, :parent_id
  end
end
