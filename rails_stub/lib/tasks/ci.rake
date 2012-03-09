desc "Setup our CI to work with Rspec2, Rcov and CI Reporter"
namespace :ci do
  task :setup do
    gem 'ci_reporter'
    require 'ci/reporter/rake/rspec'
    task("ci:setup:rspec").invoke
  end
  task :spec => [:setup, "rake:spec"]
  namespace :spec do
    task :coverage => [:setup, "rake:spec:rcov"]
  end
end