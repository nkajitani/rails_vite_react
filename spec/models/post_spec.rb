require 'rails_helper'

RSpec.describe Post, type: :model do
  it 'associates' do
    is_expected.to have_many(:comments).dependent(:destroy)
  end

  it 'validations' do
    is_expected.to validate_presence_of(:title)
    is_expected.to validate_presence_of(:body)
    is_expected.to validate_presence_of(:image)
    is_expected.to validate_presence_of(:published_at)
  end
end
