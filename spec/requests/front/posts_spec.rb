require 'rails_helper'

RSpec.describe "Front::Posts", type: :request do
  describe 'GET /' do
    it 'returns 200 success' do
      create_list(:post, 3, published_at: 1.day.ago)
      get root_path

      expect(response).to have_http_status(:success)
      expect(response).to render_template(:index)
    end

    it 'returns list limit posts' do
      create_list(:post, 30, published_at: 1.day.ago)
      get root_path

      expect(response).to have_http_status(:success)
      expect(assigns(:posts).size).to eq(25)

      get root_path, params: { page: 2 }
      expect(response).to have_http_status(:success)
      expect(assigns(:posts).size).to eq(5)
    end

    it 'does not show unpublished posts' do
      create_list(:post, 2, published_at: 1.day.from_now)
      get root_path

      expect(response).to have_http_status(:success)
      expect(assigns(:posts).size).to eq(0)
    end
  end

  describe 'GET /posts/:id' do
    it 'returns 200 success' do
      post = create(:post, published_at: 1.day.ago)
      get post_path(post)

      expect(response).to have_http_status(:success)
      expect(response).to render_template(:show)
      expect(assigns(:post)).to eq(post)
    end

    it 'returns 404 not_found' do
      post = create(:post, published_at: 1.day.from_now)
      get post_path(post)

      expect(response).to have_http_status(:not_found)
    end
  end
end
