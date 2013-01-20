class User < ActiveRecord::Base
  has_secure_password
  
  attr_accessible :email, :password, :password_confirmation

  has_one :profile, :through => :id

  validates_uniqueness_of :email

  def profile
    id = self.id
    puts "id = #{id}"
    profile = Profile.find_by_user_id( id )
    puts "Profile.all = #{Profile.all}"
    puts "profile = #{profile}"
    profile
  end

end
