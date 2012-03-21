class SpritesController < ApplicationController

  def show
    respond_to do |format| 
      format.js { :render :json => "sprites/index.json" }
    end  
  end  
end
