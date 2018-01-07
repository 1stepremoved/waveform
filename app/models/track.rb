class Track < ApplicationRecord
  validates :title, presence: true

  belongs_to :user

  has_attached_file :audio
  validates_attachment_content_type :audio, :content_type => [ 'audio/mpeg', 'audio/x-mpeg',
      'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3',
      'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio' ]



  has_attached_file :image, default_url: "default_track_image.jpeg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
