require 'rails_helper'

RSpec.describe "Front::Comments", type: :request do
  describe 'POST /posts/:id/comments' do
    it 'returns 302 redirect' do
      record = create(:post, published_at: 1.day.ago)
      post post_comments_path(record), params: { comment: { body: 'Great post!', name: 'Test User' } }

      expect(response).to have_http_status(:redirect)
      expect(response).to redirect_to(post_path(record))
    end
    it 'return 404 not_found' do
      record = create(:post, published_at: 1.day.from_now)
      post post_comments_path(record), params: { comment: { body: 'Great post!', name: 'Test User' } }

      expect(response).to have_http_status(:not_found)
    end
  end
end
