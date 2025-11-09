# コメント
class Comment < ApplicationRecord
  belongs_to :post

  validates :body, presence: true
  validates :name, presence: true
end
