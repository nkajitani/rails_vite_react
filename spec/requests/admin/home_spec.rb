require 'rails_helper'

RSpec.describe "Admin::Home", type: :request do
  describe 'GET /admin' do
    it 'when didn\'t sign in' do
      get admin_root_path

      expect(response).to have_http_status(:redirect)
      expect(response).to redirect_to(new_user_session_path)
    end

    it 'when already signed in' do
      sign_in create(:user)
      get admin_root_path

      expect(response).to have_http_status(:success)
      expect(response).to render_template(:index, layout: 'admin')
    end
  end
end
