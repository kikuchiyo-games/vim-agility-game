class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def current_user
    begin
      @current_user ||= User.find( session[ :user_id ] ) if session[ :user_id ]
    rescue
      Rails.logger.debug "sessions#current_user => Returning nil"
      return nil
    end
  end

  helper_method :current_user
  
  def authorize
    if current_user.nil?
      redirect_to root_path, :alert => "Not authorized"
    end
    puts "sessions#authorize => everything ok! session user_id = #{ session[:user_id] }"
  end
end
