require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe "when visiting the root-path" do

  before :each do
    visit root_path
  end

  describe "when logging in successfully" do
    before :each do
      fill_in 'Email', :with => 'Mr. Huxtable'
      fill_in 'Password', :with => 'abc123'
      click_button 'login'
    end

    it "should display the user page, greeting the user"
  end
end
