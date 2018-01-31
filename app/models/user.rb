class User < ApplicationRecord
  validates :username, :email, :session_token, :password_digest, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 8, allow_nil: true}

  has_many :tracks

  has_many :likes

  has_many :liked_tracks, through: :likes, source: :likeable, source_type: :Track

  after_initialize :ensure_session_token #, :ensure_image_url
  attr_reader :password

  has_attached_file :profile_image, default_url: "default_profile.png"
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\Z/

  has_attached_file :background_image, default_url: "default_background_image.jpg"
  validates_attachment_content_type :background_image, content_type: /\Aimage\/.*\Z/


  def ensure_session_token
    token = SecureRandom.urlsafe_base64
    token = SecureRandom.urlsafe_base64 while User.find_by(session_token: token)
    self.session_token ||= token;
  end

  def reset_token!
    token = SecureRandom.urlsafe_base64
    token = SecureRandom.urlsafe_base64 while User.find_by(session_token: token)
    self.session_token = token
    self.save!
    self.session_token
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def self.find_by_creds(username,pw)
    user = User.find_by(username: username) || User.find_by(email: username)
    return user if user && user.is_password?(pw)
  end
end
