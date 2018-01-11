class AddCommentableIdToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :commentable_id, :integer
    add_column :comments, :commentable_type, :string

    add_index :comments, [:commentable_type, :commentable_id]
  end
end
