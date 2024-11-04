require 'net/http'
require 'json'
require 'uri'

class SateliteTrack
  BASE_URL = "https://api.n2yo.com/rest/v1/satellite"

  def self.api_key
    ENV['N2YO_TOKEN'] || raise("API key not found")
  end

  def self.get_satelite_nearby(latitude, longitude, altitude, radius)
    uri = URI("#{BASE_URL}/above/#{latitude}/#{longitude}/#{altitude}/#{radius}/0/&apiKey=#{api_key}")
    response = Net::HTTP.get(uri)
    data = JSON.parse(response)

    satelite_list = []

    if data['above']
      data['above'].each do |sat|
        satelite_list << {
          sat_id: sat['satid'],
          observer_lat: sat['satlat'] || latitude,
          observer_lng: sat['satlng'] || longitude,
          satname: sat['satname']
        }
      end
    end
    satelite_list
  end
end
