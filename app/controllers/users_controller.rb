class UsersController < ApplicationController
  before_filter :authorize, :only => :show

  def new
    @user = User.new
  end

  def show
    # ensure user is current_user, else redirect to log in and kill session
    @user = User.find( session[:user_id] )
    if @user != current_user || ( params[:id] && @user.id != params[:id].to_i )
      redirect_to root_url, :notice => "You have been logged out for accessing a resrouce illegally."
    end
  end

  def create
    @user = User.new( params[:user] )
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_url, :notice => "Thank you for signing up!"
    else
      render "new"
    end
  end
end
