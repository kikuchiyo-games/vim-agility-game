class Profile < ActiveRecord::Base
  belongs_to :user
  before_save :default_values
  has_one :user, :through => :user_id
  def default_values
    self.rubies ||= 0
    self.diamonds ||= 0
    self.bravery_points ||= 0.0
    self.experience_points ||= 0.0
  end
end
