Given /^a new session$/ do
  lambda { visit root_path }.should_not raise_error
end

When /^person cannot log in$/ do
  fill_in 'email', :with => 'doesnotexist'
  fill_in 'password', :with => 'doesnotexist'
  page.find( 'input[@name="commit"]' ).click
end

Then /^person can see flash warning$/ do
  page.find( '#notice' ).text.should match 'Invalid login \/ password combination'
end
