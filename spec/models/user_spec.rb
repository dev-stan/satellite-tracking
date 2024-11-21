require "rails_helper"

RSpec.describe User, type: :model do 

    let (:valid_attributes) do
        {
            email: "example@example.com",
            password: "password123",
            password_confirmation: "password123"
        }
    end

    context "validations" do
        it "is valid with email, password and password_confirmation" do
            user = User.new(valid_attributes)
            expect(user).to be_valid
        end

        it "is not valid without password" do
            user = User.new(valid_attributes.except(:password))
            expect(user).not_to be_valid
        end

        it "is not valid without password_confirmation" do
            user = User.new(valid_attributes.except(:password))
            expect(user).not_to be_valid
        end

        it "is not valid without email" do
            user = User.new(valid_attributes.except(:email))
            expect(user).not_to be_valid
        end

        


    end
end