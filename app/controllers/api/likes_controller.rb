class Api::LikesController < ApplicationController
  def create
    @like = Like.new(like_params)
    if (Like.find_by(user_id: params[:like][:user_id], likeable_id: params[:like][:likeable_id], likeable_type: params[:like][:likeable_type]))
      render json: ["User has already liked this item"],status: 401
      return
    elsif current_user && params[:like][:user_id].to_i != current_user.id
      render json: ["Cannot like items in other users' names"],status: 401
      return
    elsif @like.save
      @user = current_user
      render "api/users/show"
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    @like = Like.find_by(id: params[:id])
    if @like
      if @like.destroy
        @user = current_user
        render "api/users/show"
      else
        render json: @like.errors.full_messages, status: 422
      end
    else
      render json: ["Cannot unlike a track that isn't liked"],status: 401
    end
  end

  private
  def like_params
    params.require(:like).permit(:user_id, :likeable_id, :likeable_type)
  end
end
