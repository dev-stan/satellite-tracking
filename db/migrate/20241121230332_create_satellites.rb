class CreateSatellites < ActiveRecord::Migration[7.2]
  def change
    create_table :satellites do |t|
      t.string :name
      t.float :latitude
      t.float :longtitude

      t.timestamps
    end
  end
end
