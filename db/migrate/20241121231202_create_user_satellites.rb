class CreateUserSatellites < ActiveRecord::Migration[7.2]
  def change
    create_table :user_satellites do |t|
      t.references :user, null: false, foreign_key: true
      t.references :satellite, null: false, foreign_key: true
      t.datetime :saved_at

      t.timestamps
    end
  end
end
