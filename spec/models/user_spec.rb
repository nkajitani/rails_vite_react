require 'rails_helper'

RSpec.describe User, type: :model do
  it 'validations' do
    is_expected.to validate_presence_of(:name)
  end

  it 'update_without_current_password' do
    user = create(:user)
    params = { name: 'New Name', email: 'new_email@example.com' }
    user.update_without_current_password(params)
    expect(user.name).to eq(params[:name])
    expect(user.email).to eq(params[:email])
  end
end
