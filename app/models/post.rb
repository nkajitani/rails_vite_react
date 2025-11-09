# ブログ
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy

  mount_uploader :image, ::ImageUploader

  validates :title, presence: true
  validates :body, presence: true
  validates :image, presence: true
  validates :published_at, presence: true
end
