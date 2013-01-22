class ProfilesController < ApplicationController
  before_filter :authorize

  def update
    respond_to do |format|
      format.json {
        profile = current_user.profile
        profile.update_attributes(
          :bravery_points => profile.bravery_points.to_f + params[:bravery_points].to_f,
          :experience_points => profile.experience_points.to_f + params[:experience_points].to_f,
          :diamonds => profile.diamonds.to_i + params[:diamonds].to_i,
          :rubies => profile.rubies.to_i + params[:rubies].to_i,
          :kills => profile.kills.to_i + params[:kills].to_i
        ).save!
      }
    end
  end
end
