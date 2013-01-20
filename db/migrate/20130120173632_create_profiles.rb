class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.float   :bravery_points
      t.integer :rubies
      t.integer :diamonds
      t.float   :experience_points
      t.timestamps
    end
  end
end
