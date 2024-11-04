class CreateSatelites < ActiveRecord::Migration[7.2]
  def change
    create_table :satelites do |t|
      t.integer :sat_id
      t.float :observer_lat
      t.float :observer_lng
      t.string :satname

      t.timestamps
    end
  end
end
