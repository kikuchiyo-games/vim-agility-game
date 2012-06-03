require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe "when visiting the root-path", :js => true do
  before :each do
    visit root_path
  end

  describe "when clicking the create-account link" do
    before :each do
      page.find('div#create-account a').click
    end

    describe "a form is displayed as expected" do
      before :each do
        page.has_css?('form').should be_true
      end

      it "should display the expected email label" do
        page.find('label[@for="user_email"]').text.should == 'Email'
      end 
      it "should display the expected email input box" do
        page.find('#user_email').should_not be_nil
      end 
      it "should display the expected password label" do
        page.find('label[@for="user_password"]').text.should == 'Password'
      end 
      it "should display the expected password input box" do
        page.find('#user_password').should_not be_nil
      end 
      it "should display the expected password confirmation label" do
        page.find('label[@for="user_password_confirmation"]').text.should == 'Password confirmation'
      end 
      it "should display the expected password confirmation input box" do
        page.find('#user_password_confirmation').should_not be_nil
      end 

      describe "when passwords do not match" do
        before :each do
          fill_in 'Email', :with => 'Mr. Huxtable'  
          fill_in 'Password', :with => 'abc123'  
          fill_in 'Password confirmation', :with => 'abc1234'  
          click_button 'Create User'
        end

        it "lets user know the form input is invalid" do
          page.find('div.error_messages h2').text.should == 'Form is invalid'
          page.find('div.error_messages ul li').text.should match /Password doesn\'t match confirmation/
        end 
      end 
    end 

    describe "when the login button is behaving properly" do
      before :each do
        page.find('div#log-in a').click
      end

      describe "a form is displayed as expected" do
        before :each do
          page.has_css?('form').should be_true
        end
        it "should display the expected form header" do
          page.find('h3#log-in').should have_content('Log In')
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
    end
  end 
end 
