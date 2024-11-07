# app/controllers/pages_controller.rb
class PagesController < ApplicationController
  protect_from_forgery with: :null_session  # Necessary for API-like endpoints

  def home
    @mapbox_token = ENV["MAPBOX_TOKEN"]
    @satelites_list = SateliteTrack.get_satelite_nearby(52.409538, 16.931992, altitude=0, radius=30)

    Rails.logger.info(@satelites_list)
  end

  def search
    city = params[:query]
    if city.blank?
      render json: { error: "City name cannot be blank." }, status: :bad_request
      return
    end

    coordinates = SateliteTrack.geocode_city(city)
    if coordinates.nil?
      render json: { error: "Could not find the city: #{city}" }, status: :not_found
      return
    end

    satelite_list = SateliteTrack.get_satelite_nearby(
      coordinates[:latitude],
      coordinates[:longitude],
      altitude = 0,
      radius = 30
    )

    render json: {
      satellites: satelite_list,
      observer_lat: coordinates[:latitude],
      observer_lng: coordinates[:longitude]
    }
  rescue StandardError => e
    Rails.logger.error("Search Error: #{e.message}")
    render json: { error: "An error occurred while processing your request." }, status: :internal_server_error
  end
end
