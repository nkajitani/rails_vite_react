class Front::CommentsController < Front::BaseController
  def create
    @post = Post.where(published_at: ..Time.current).find(params[:post_id])
    @comment = @post.comments.build(comment_params)

    if @comment.save
      redirect_to post_path(@post), notice: "コメントを投稿しました。"
    else
      @comments = @post.comments.order(created_at: :desc).page(params[:page])
      render template: "front/posts/show"
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :name)
  end
end
