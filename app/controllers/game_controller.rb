class GameController < ApplicationController
  before_filter :authorize

  def index
  end

  def show
  end

  def ruby_chase
    render :template => 'game/ruby_chase.html.erb'
  end
end
