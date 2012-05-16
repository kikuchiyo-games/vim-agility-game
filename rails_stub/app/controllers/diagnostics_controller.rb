class DiagnosticsController < ApplicationController
  def index
    respond_to do |format|
      format.html #return just HTML page with JS templates
    end
  end  

  def show
    respond_to do |format|
      format.html #return just HTML page with JS templates
      format.json { 
        @alerts = Alert.last # ("last_posted_at DESC")
        render :json => @alerts 
      }
    end
  end

end
