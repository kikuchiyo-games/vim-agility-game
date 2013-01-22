class AddKillsToProfiles < ActiveRecord::Migration
  def change
    add_column :profiles, :kills, :integer, :default => 0
  end
end
