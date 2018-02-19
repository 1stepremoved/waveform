class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render "api/comments/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
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

  def destroy
    @comment = Comment.find(params[:id])
    if current_user && current_user.id == @comment.user_id
      if @comment.destroy
        render "api/comments/show"
      else
        render json: @comment.errors.ful_messages, status: 422
      end
    else
      render json: ["Users can only delete their own comments"], status: 401
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :parent_id, :timestamp, :commentable_id, :commentable_type)
  end
end
