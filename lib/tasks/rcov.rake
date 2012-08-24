desc "Run all specs with rcov"
RSpec::Core::RakeTask.new("spec:coverage") do |t|
  t.rcov = true
  t.rcov_opts = %w{--rails --include views -Ispec --exclude gems\/,spec\/,features\/,seeds\/,log\/ }
  t.spec_opts = ["-c"]
end
