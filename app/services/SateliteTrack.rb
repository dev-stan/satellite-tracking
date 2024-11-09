# app/models/satelite_track.rb
require "net/http"
require "json"
require "uri"

class SateliteTrack
  BASE_URL = "https://api.n2yo.com/rest/v1/satellite"
  GEOCODING_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places"

  API_KEY = ENV["N2YO_TOKEN"]
  MAPBOX_TOKEN = ENV["MAPBOX_TOKEN"]

  # Haversine formula to calculate distance in km
  def self.calculate_distance(lat1, lon1, lat2, lon2)
    rad_per_deg = Math::PI / 180  # PI / 180
    rkm = 6371                     # Earth radius in kilometers

    dlat_rad = (lat2 - lat1) * rad_per_deg  # Delta, converted to rad
    dlon_rad = (lon2 - lon1) * rad_per_deg

    lat1_rad, lat2_rad = lat1 * rad_per_deg, lat2 * rad_per_deg

    a = Math.sin(dlat_rad / 2)**2 +
        Math.cos(lat1_rad) * Math.cos(lat2_rad) *
        Math.sin(dlon_rad / 2)**2
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    rkm * c # Delta in kilometers
  end

  def self.get_satelite_nearby(latitude, longitude, altitude, radius)
    uri = URI("#{BASE_URL}/above/#{latitude}/#{longitude}/#{altitude}/#{radius}/0/&apiKey=#{API_KEY}")
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    Rails.logger.info("API Response: #{data}")

    satelite_list = []

    if data["above"]
      data["above"].each do |sat|
        if sat["satlat"] && sat["satlng"]
          distance = calculate_distance(latitude, longitude, sat["satlat"], sat["satlng"])
          satelite_list << {
            sat_id: sat["satid"],
            observer_lat: sat["satlat"],
            observer_lng: sat["satlng"],
            satname: sat["satname"],
            distance: distance,
            category: sat["category"],
            launchdate: sat["launchDate"],
            satalt: sat["satalt"],


          }
        end
      end
    end

    # Sort satellites from closest to furthest
    satelite_list.sort_by { |sat| sat[:distance] }.first(32)
  end
  def self.geocode_city(city_name)
    encoded_city = CGI.escape(city_name)
    uri = URI("#{GEOCODING_URL}/#{encoded_city}.json?access_token=#{MAPBOX_TOKEN}&limit=1")
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    Rails.logger.info("Geocoding API Response: #{data}")

    if data["features"] && data["features"].any?
      longitude, latitude = data["features"][0]["center"]
      { latitude: latitude, longitude: longitude }
    else
      nil
    end
  end
end
