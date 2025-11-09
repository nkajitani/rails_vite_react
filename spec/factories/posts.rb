FactoryBot.define do
  factory :post do
    sequence(:title) { |n| "Title#{n}" }
    body { "body" }
    image do
      Rack::Test::UploadedFile.new(
        Rails.root.join('spec/fixtures/files/test_image.jpg'),
        'image/jpeg'
      )
    end
    published_at { Time.current }
  end
end
