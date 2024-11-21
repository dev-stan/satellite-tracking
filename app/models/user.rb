class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :user_satellites, dependend: :destroy
  has_many :saved_satellites, through: :user_satellites, source: :satellite

  validates :email, presence: true
  validates :password, presence: true, length: { in: 6..30}
  validates :password_confirmation, presence: true
end
