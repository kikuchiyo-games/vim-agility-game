require 'spec_helper'

describe User do
  it "instantiates" do
    lambda {
      user = User.new :email => 'johnny'
    }.should_not raise_error
  end 
  describe "validation" do
    it "throws error if no password is supplied" do
      lambda {
        user = User.new :email => 'johnny'
        user.save!
      }.should raise_error
    end 
    it "creates users when password is supplied" do
      lambda {
        @user = User.new :email => 'johnny', :password => 'abc123'
        @user.save!
      }.should_not raise_error
      User.find_by_email('johnny').should == @user
    end 
    it "ensures uniqueness of email" do
      lambda {
        @user1 = User.new :email => 'johnny', :password => 'abc123'
        @user1.save!
        @user2 = User.new :email => 'johnny', :password => 'abc1234'
        @user2.save!
      }.should raise_error
    end 
  end 
end
