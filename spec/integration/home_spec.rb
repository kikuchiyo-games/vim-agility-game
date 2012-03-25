require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe "when visiting the root-path" do

  before :each do
    visit root_path
  end

  describe "and viewing the header", :js => true do
    before :each do
      page.has_css?('#header-container').should be_true
    end

    describe "when the header is displayed as expected" do
      it "should have login button" do
        page.has_css?('button#login').should be_true
      end 
      it "should have register button" do
        page.has_css?('button#register').should be_true
      end 
      it "should have sample-home button" do
        page.has_css?('button#home').should be_true
      end    

      describe "when the login button is behaving properly" do
        before :each do
          click_button 'login'
        end
        describe "a form is displayed as expected" do
          before :each do
            page.has_css?('form').should be_true
          end
          it "should display the expected form header" do
            page.find('#prompt').should have_content('Log In:') 
          end 
        end 
      end 

      describe "when the register button is behaving properly" do
        before :each do
          click_button 'register'
        end
        describe "a form is displayed as expected" do
          before :each do
            page.has_css?('form').should be_true
          end
          it "should display the expected form header" do
            page.find('#prompt').should have_content('Register:') 
          end 
        end 
      end 

      describe "when the sample-home button is behaving properly" do
        before :each do
          click_button 'sample home'
        end
        describe "a form is displayed as expected" do
          before :each do
            page.has_css?('#home-partial').should be_true
          end
          it "should display the expected header" do
            page.find('#home-partial > h3').should have_content('Welcome Home!') 
          end 
          describe "when the practice-your-vim-skills button is behaving properly" do
            before :each do
              click_button 'Practice Your Vim Skills'
            end
            it "should display the expected header" do
              page.find('#practice-partial > h3').should have_content('Practice!')
            end
            it "should display kikuchiyo" do
              page.has_css?('div#kikuchiyo').should be_true
            end
          end 
        end 
      end 
    end 
  end 
end
