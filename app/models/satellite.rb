class Satellite < ApplicationRecord
    has_many :user_satellites
    has_many :saved_by_user, through: :user_satellites, source: :user

end
