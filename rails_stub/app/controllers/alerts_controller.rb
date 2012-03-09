class AlertsController < ApplicationController
  def index
    respond_to do |format|
      # format.js { @alerts = Alert.last # ("last_posted_at DESC") render :json => @alerts }
      format.js { render :partial => 'alerts/index.json' }
    end
  end  
end
