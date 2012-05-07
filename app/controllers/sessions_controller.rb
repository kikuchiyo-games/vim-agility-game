class SessionsController < ApplicationController
  # create session on log in
  # what is restful way to create new user?
  def new
  end

  def create
    begin
    session[:user_id] = User.authenticate( 
      params[:username], params[:password]
    ).id
    flash[:notice] = 'Welcome back!'
    redirect_to :action => session[:intended_action], :controller => session[:intended_controller]
    rescue  
      flash[:notice] = 'Invalid username or password'
      redirect_to new_session_path
    end
  end

  def destroy
    session[:user_id] = null
    redirect_to session_path, :notice => 'Come Back soon!'
  end

end
