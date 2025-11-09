require 'rails_helper'

RSpec.describe Comment, type: :model do
  it 'associates' do
    is_expected.to belong_to(:post)
  end

  it 'validations' do
    is_expected.to validate_presence_of(:body)
    is_expected.to validate_presence_of(:name)
  end
end
