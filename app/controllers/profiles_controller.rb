class ProfilesController < ApplicationController
  before_filter :authorize
  def update
    respond_to do |format|
      format.json {
        current_user.profile.update_attributes(
          :bravery_points => params[:bravery_points].to_f,
          :experience_points => params[:experience_points].to_f,
          :diamonds => params[:diamonds].to_i,
          :rubies => params[:rubies].to_i
        ).save!
      }
    end
  end
end
