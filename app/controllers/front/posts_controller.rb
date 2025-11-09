class Front::PostsController < Front::BaseController
  def index
    @posts = Post.where(published_at: ..Time.current).order(published_at: :desc)
                                                     .page(params[:page])
  end

  def show
    @post = Post.where(published_at: ..Time.current).find(params[:id])
    @comment = @post.comments.build
    @comments = @post.comments.order(created_at: :desc).page(params[:page])
  end
end
