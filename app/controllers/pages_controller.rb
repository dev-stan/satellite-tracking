class PagesController < ApplicationController
    def home
        @mapbox_token = ENV['MAPBOX_TOKEN']
        sateliteTrack = SateliteTrack.new()
        @satelites_list = SateliteTrack.get_satelite_nearby(52.409538, 16.931992, altitude=0, radius=10)
        Rails.logger.info(@satelites_list)
      end
end