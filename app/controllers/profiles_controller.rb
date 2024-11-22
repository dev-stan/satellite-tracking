class ProfilesController < ApplicationController

  before_action :authenticate_user!
  def show
    @saved_satellites = current_user.saved_satellites
  end
end
