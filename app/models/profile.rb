class Profile < ActiveRecord::Base
  belongs_to :user
  has_one :user, :through => :user_id
end
