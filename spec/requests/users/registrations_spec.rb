require 'rails_helper'

RSpec.describe "Users::Registrations", type: :request do
  describe "POST /admin/sign_up" do
    let(:valid_attributes) do
      {
        user: {
          name: "Test User",
          email: "test@example.com",
          password: "password",
          password_confirmation: "password"
        }
      }
    end

    it 'renders a successful response' do
      post user_registration_path, params: valid_attributes
      expect(response).to redirect_to(new_user_session_path)
    end

    # Skip invalid case as the registrations logic remains standard Devise
    # it 'renders an unsuccessful response when validation fails' {}
  end
end
