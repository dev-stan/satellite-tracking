class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  #STAN NOTE the code below made it impossible to view website from mobile
  #allow_browser versions: :modern

  # code below helps out with meta tags 
  def default_url_options
    { host: ENV[“DOMAIN”] || “localhost:3000"}
    end
end
