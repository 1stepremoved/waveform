# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do
  User.destroy_all
  50.times do
    name = Faker::Name.name
    username = Faker::Internet.user_name(name)
    email = Faker::Internet.email(name)
    password = Faker::Internet.password(8,20)
    User.create(username: username,
                email: email,
                password: password)
  end

  User.create(username: "admin", email: "admin", password: "adminadmin")

  tracks = Dir["/Users/c/desktop/waveform/app/assets/audio/Shilpa_Ray_-_Live_at_Monty_Hall_11102017/*"].map do |path|
    path[/app.*/]
  end

  Track.destroy_all()
  tracks.each do |track|
    Track.create(title: track[/audio\/.*/][6..-1],
                 user_id: User.find_by(username: "admin").id,
                 audio: File.open(track) )
  end
end
