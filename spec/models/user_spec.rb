require 'spec_helper'

describe User do
  it "instantiates" do
    expect {
      user = User.new :username => 'johnny'
    }.should_not raise_error
  end 
  describe "validation" do
    it "throws error if no password is supplied" do
      expect {
        user = User.new :username => 'johnny'
        user.save!
      }.should raise_error
    end 
    it "creates users when passwords are supplied" do
      expect {
        @user = User.new :username => 'johnny', :password => 'abc123'
        @user.save!
      }.should_not raise_error
      User.find_by_username('johnny').should == @user
    end 
    it "expectation here" do
      expect {
        @user1 = User.new :username => 'johnny', :password => 'abc123'
        @user1.save
        @user2 = User.new :username => 'johnny', :password => 'abc1234'
        @user2.save
      }.should raise_error
    end 
  end 
end
