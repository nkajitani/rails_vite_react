class Admin::PostsController < Admin::BaseController
  before_action :set_post, only: %i[ show edit update destroy ]

  # GET /admin/posts
  def index
    @posts = Post.order(published_at: :desc).page(params[:page])
  end

  # GET /admin/posts/1
  def show; end

  # GET /admin/posts/new
  def new
    @post = Post.new
  end

  # GET /admin/posts/1/edit
  def edit; end

  # POST /admin/posts
  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to [ :admin, @post ], notice: "ブログが作成されました。"
    else
      render :new, status: :unprocessable_content
    end
  end

  # PATCH/PUT /admin/posts/1
  def update
    if @post.update(post_params)
      redirect_to [ :admin, @post ], notice: "ブログが更新されました。"
    else
      render :edit, status: :unprocessable_content
    end
  end

  # DELETE /admin/posts/1
  def destroy
    @post.destroy!
    redirect_to admin_posts_path, notice: "ブログが削除されました。"
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.fetch(:post).permit(:title, :body, :image, :image_cache, :published_at)
    end
end
