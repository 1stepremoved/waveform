class Comment < ApplicationRecord
  validates :body, presence: true

  belongs_to :commentable, polymorphic: true

  after_initialize :ensure_timestamp

  def ensure_timestamp
    self.timestamp ||= 0;
  end
end
