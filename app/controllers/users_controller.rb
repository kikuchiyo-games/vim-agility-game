class UsersController < ApplicationController
  before_filter :authorize, :only => :show

  def index
    @profiles = Profile.all.sort_by{ |record| -record.experience_points }
  end

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

  def home
    redirect_to users_show_path
  end

  def create
    @user = User.new( params[:user] )
    if @user.save
      session[:user_id] = @user.id
      Profile.new( :user_id => @user.id ).save!
      redirect_to root_url, :notice => "Thank you for signing up!"
    else
      render "new"
    end
  end
end
