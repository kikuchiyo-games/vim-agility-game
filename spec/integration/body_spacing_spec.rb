require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe "when visiting the root-path" do

  before :each do
    visit root_path
    @user = User.new :email => 'Mr. Huxtable', :password => 'abc123'
    expect{ @user.save! }.should_not raise_error
  end

  describe "when logging in successfully" do
    before :each do
      fill_in 'Email', :with => 'Mr. Huxtable'
      fill_in 'Password', :with => 'abc123'
      click_button 'login'
    end
    it "should display the user page, greeting the user" do
      page.has_content?( 
        'Mr. Huxtable, to start your journey, we will be focusing on the following keys ' 
      ).should be_true
    end 
  end
end
