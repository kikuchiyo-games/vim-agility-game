require 'spec_helper'

describe 'tabination', :js => true do
  describe "when not yet logged in" do
    before :each do
      visit root_path
    end
    it 'should show log in page', :js => true do
      page.should have_content('Diagnostics')
    end
  end

  describe "when at sod_ui ( root ) page", :js => true do
    before :each do
      visit root_path
    end

    describe "tab functionality", :js => true do

      describe "diagnostics tab" do

        describe "accordion sub-view" do

          before :each do
            page.has_content?('Diagnostics')
            click_link 'Diagnostics' 
          end

          describe "bellow sub-view" do

	          it 'should have proper text' do
	            page.should have_content('Spatial Analysis')
	            page.should have_content('Data Mining')
	            page.should have_content('Project Analysis')
	          end

            describe "Spatial Analysis Tab", :js => true do

              describe "Is open by default" do

                it "should have a summary_table_container " do
                  page.should have_selector('div#summary_table_container')#.text.should == "Thank you for contributing!"
                end

                describe "summary table component" do
                  it "should have a summary_table " do
                    page.has_css?( '#summary_table' ).should be_true
                  end 

                  describe "clickable first column" do
                    before :each do
                      page.has_css?( 'tr#group-id-summary_table-sa-da-tay-project' ).should be_true
                    end

                    describe "when not clicked" do
                      it "details table should now exist" do
                        page.find( :xpath,  "//tr[@data-group='sa-da-tay-project']" ).should be_visible
                      end  
                      it "should have the expected content" do
                        page.should have_content('Sa Da Tay Project')
                        page.should have_content('130.00')
                        page.should have_content('some site that needs your help, again!')
                        page.should have_content('2 days old')
                      end
                    end                     

                    describe "when clicked odd number of times" do
                      before :each do
                        page.find( 'td.group.sa-da-tay-project' ).click
                      end
                      it "should not have the un-expected content" do
                        # page.should_not have_content('2 days old')
                        page.find( :xpath,  "//tr[@data-group='sa-da-tay-project']" ).should_not be_visible
                      end
                    end

                    describe "when clicked even number of times" do
                      before :each do
                        page.find( 'td.group.sa-da-tay-project' ).click
                        page.find( 'td.group.sa-da-tay-project' ).click
                      end
                      it "details table should exist again" do
                        page.find( :xpath,  "//tr[@data-group='sa-da-tay-project']" ).should be_visible
                      end  
                    end 
                  end 
                end 
                # describe "can expand by hiding map" do
                #   before :each do
                #     click_link 'Toggle Map'
                #   end
                #   it "should have a width of 1000px" do
                #     page.should have_css?('')
                #   end 
                #    
                # end 
              end 

              describe "Is closed on first click" do
                before :each do
                  click_link 'Spatial Analysis'
                end
                it "hides summary table" #do
                  #page.should_not have_content('Showing')
                #end  
              end
            end
	        end
        end
      end
    end
  end
end
