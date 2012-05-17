require 'spec_helper'
describe GameController do
  it "should exist" do
    expect {
      @game_controller = GameController.new
    }.should_not raise_error
  end 
  it "knows about its new action" do
    expect {
      get :index
    }.should_not raise_error
  end 
end 
