source 'http://rubygems.org'

gem 'bcrypt-ruby', 
  :require => 'bcrypt'

gem 'rails', '3.1.1'
gem 'jquery-rails'
gem 'json'

group :production do
  gem 'pg'
end

group :assets do
  gem 'sass-rails',   '~> 3.1.4'
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
end

group :test, :development do
  gem 'rcov'
  gem 'sqlite3'
  gem 'headless'

  gem 'cucumber-rails'
  gem 'rspec-rails'

  gem 'capybara'
  gem 'capybara-webkit'
end
