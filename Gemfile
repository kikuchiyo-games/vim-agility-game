source 'http://rubygems.org'

gem 'bcrypt-ruby', 
  :require => 'bcrypt'

gem 'rails', '3.1.1'
gem 'jquery-rails'
gem 'json'
# gem 'activerecord-mysql2-adapter'
gem 'mysql2', '0.3.7'
group :production do
  # gem 'pg'
  # gem 'activerecord-mysql2-adapter'
  # gem 'mysql2' #, '0.3.7'
  # gem 'sqlite3'
end

group :assets do
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end

group :test, :development do
  #-- db --#
    gem 'sqlite3'
end

group :test do
  #-- db --#
    gem 'database_cleaner'

  #-- reporting --#
  #  gem 'rcov'

  #-- tdd --#
    gem 'rspec'
    gem 'rspec-rails'

  #-- bdd --#
  #----- ruby -----#
    gem 'cucumber'
    gem 'cucumber-rails'

  #----- js -----#
    gem 'jasmine'
    gem 'jasmine-headless-webkit'

  #----- browser -----#
    gem 'headless'
    gem 'capybara'
    gem 'therubyracer'
    gem 'capybara-webkit'
end
