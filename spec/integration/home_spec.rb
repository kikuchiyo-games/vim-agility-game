require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe "when visiting the root-path" do

  before :each do
    visit root_path
  end

  describe "with expected sign-up link" do
    before :each do
      page.has_css?( '#create-account' ).should be_true
    end
    it 'displayes sign-up link' do
      page.has_css?( '#create-account' ).should be_true
    end
    it "displays a create-account image" do
      page.has_css?('#create-account img').should be_true
    end 
    it "displays a create-account content" do
      page.find('#create-account a').text.should match /\s*Create an Account!\s*/
    end 
  end      

  describe "and viewing the header", :js => true do
    before :each do
      page.has_css?('#header-container').should be_true
    end

    describe "when the header is displayed as expected" do
      it "should have a link to create a new account" do
        page.has_css?('div#create-account').should be_true
      end 
      describe "when the register button is behaving properly" do
        before :each do
          page.find('div#create-account a').click
        end

        it "should display the expected log-in link" do
          page.find('div#log-in').should have_content('Log in') 
        end 
      end 

 
    end 
  end 
end
