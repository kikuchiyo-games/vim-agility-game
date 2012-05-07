class User < ActiveRecord::Base
  has_secure_password
  validates_uniqueness_of :username

  def self.authenticate(username, password)
    user = User.find_by_username(username)
    unless user && user.authenticate(password)
      raise "Username or password invalid #{user} #{user.authenticate(password)}"
    end
    user
  end
end
