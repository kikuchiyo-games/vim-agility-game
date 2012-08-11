# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)
require 'rspec/rails'
require 'rspec/autorun'

# Requires supporting ruby files with custom matchers and macros, etc,
# in spec/support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

RSpec.configure do |config|
  # ## Mock Framework
  #
  # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
  #
  # config.mock_with :mocha
  # config.mock_with :flexmock
  # config.mock_with :rr

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # If true, the base class of anonymous controllers will be inferred
  # automatically. This will be the default behavior in future versions of
  # rspec-rails.
  config.infer_base_class_for_anonymous_controllers = false
end

module JasmineFixtureGeneration
  # Saves the markup to a fixture file using the given name
  def save_fixture(markup, name, fixture_path=nil )
    fixture_path = Rails.root.join('tmp', 'js_dom_fixtures') unless fixture_path
    Dir.mkdir(fixture_path) unless File.exists?(fixture_path)

    fixture_file = fixture_path.join("#{name}.fixture.html")
    File.open(fixture_file, 'w') do |file|
      file.puts(markup)
    end
  end

  # From the controller spec response body, extracts html identified
  # by the css selector.
  def html_for(selector)
    doc = Nokogiri::HTML(response.body)

    remove_third_party_scripts(doc)
    content = doc.css(selector).first.to_s

    return convert_body_tag_to_div(content)
  end

  # Remove scripts such as Google Analytics to avoid running them
  # when we load into the dom during js specs.
  def remove_third_party_scripts(doc)
    scripts = doc.at('#third-party-scripts')
    scripts.remove if scripts
  end

  # Many of our css and jQuery selectors rely on a class attribute we
  # normally embed in the <body>. For example:
  #
  # <body class="workspaces show">
  #
  # Here we convert the body tag to a div so that we can load it into
  # the document running js specs without embedding a <body> within a <body>.
  def convert_body_tag_to_div(markup)
    return markup.gsub("<body", '<div').gsub("</body>", "</div>")
  end
end

RSpec::Rails::ControllerExampleGroup.class_eval do
  include JasmineFixtureGeneration
end
