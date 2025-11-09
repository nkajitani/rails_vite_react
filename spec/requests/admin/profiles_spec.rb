require 'rails_helper'

RSpec.describe "Admin::Profile", type: :request do
  let(:user) { create(:user) }
  before { sign_in user }

  describe 'GET /admin/profile' do
    it 'returns 200 success' do
      get admin_profile_path

      expect(response).to have_http_status(:success)
      expect(response).to render_template(:show)
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'GET /admin/profile/edit' do
    it 'returns 200 success' do
      get edit_admin_profile_path

      expect(response).to have_http_status(:success)
      expect(response).to render_template(:edit)
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'PATCH /admin/profile' do
    it 'returns 200 success' do
      patch admin_profile_path, params: { user: { name: 'New Name', email: 'new_email@example.com' } }

      expect(response).to redirect_to(admin_profile_path)
      expect(flash[:notice]).to eq('プロフィールを更新しました。')
      user.reload
      expect(user.name).to eq('New Name')
      expect(user.email).to eq('new_email@example.com')
    end
    it 'returns 422 unprocessable' do
      patch admin_profile_path, params: { user: { name: '', email: 'invalid_email' } }

      expect(response).to have_http_status(:unprocessable_content)
      expect(response).to render_template(:edit)
      expect(assigns(:user).errors).to be_present
    end
  end
end
