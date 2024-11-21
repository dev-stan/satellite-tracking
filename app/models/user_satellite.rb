class UserSatellite < ApplicationRecord
  belongs_to :user
  belongs_to :satellite
end
