class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def current_user
    begin
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    rescue
      return nil
    end
  end

  helper_method :current_user
  
  def authorize
    redirect_to sessions_new_path, :alert => "Not authorized" if current_user.nil?
  end
end
