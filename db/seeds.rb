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
end
