class User < ActiveRecord::Base
  has_secure_password
  
  attr_accessible :email, :password, :password_confirmation

  has_one :profile, :through => :id

  validates_uniqueness_of :email

  def profile
    id = self.id
    Profile.find_by_user_id( id )
  end
end
