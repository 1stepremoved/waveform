class User < ApplicationRecord
  validates :username, :email, :session_token, :password_digest, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 8, allow_nil: true}

  after_initialize :ensure_session_token #, :ensure_image_url
  attr_reader :password

  has_attached_file :profile_image, default_url: "default_profile.png"
  validates_attachment_content_type :profile_image, content_type: /\Aimage\/.*\Z/

  # def ensure_image_url
  #   self.image_url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  # end

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
