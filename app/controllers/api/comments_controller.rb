class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render "api/comments/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def show

  end

  def index
    offset = params[:offset] ? params[:offset] : 0
    limit = params[:limit] ? params[:limit] : 10
    if (params[:track_id])
      @comments = Track.find(params[:track_id]).comments
      @total_comments = @comments.length
      @comments = @comments.order('created_at DESC').offset(offset).limit(limit)
    end
    render "api/comments/index"
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :parent_id, :timestamp, :commentable_id, :commentable_type)
  end
end
