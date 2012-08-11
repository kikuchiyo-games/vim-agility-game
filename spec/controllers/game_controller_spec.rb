require 'spec_helper'

describe GameController do
  it "should exist" do
    lambda {
      @game_controller = GameController.new
    }.should_not raise_error
  end 
  it "knows about its new action" do
    lambda {
      get :index
      save_fixture( response.body, 'project_file')
    }.should_not raise_error
  end 
end 
