FactoryBot.define do
  factory :comment do
    post
    body { "This is a comment." }
    name { "Test User" }
  end
end
