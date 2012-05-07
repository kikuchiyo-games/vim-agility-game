class KikuchiyosWayController < ApplicationController
  before_filter :check_authorization

  def index
  end

  def check_authorization
    unless session[:user_id]
      session[:intended_action] = action_name
      session[:intended_controller] = controller_name
      redirect_to new_session_url
    end
  end
end
