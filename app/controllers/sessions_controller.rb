class SessionsController < ApplicationController
  # create session on log in
  # what is restful way to create new user?
  def new
    
  end

  def create
    @user = User.find_by_email( params[ :email ] )
    if @user && @user.authenticate( params[ :password ] )
      session[:user_id] = @user.id
      flash[:notice] = 'Logged in!'
      redirect_to user_path( @user.id ), :notice => "Logged in!"
    else
      # flash.now.alert = "Email or password is invalid"
      flash[:notice] = 'Invalid login / password combination'
      render "new"
    end
  end
  
  def destroy
    reset_session 
    redirect_to root_url, :notice => "Logged out!"
  end

end
