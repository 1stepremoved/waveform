class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render "api/users/showOther"
    else
      render json: ["Unable to find requested user"], status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id]);
    if @user && @user == current_user
      if @user.update(user_update_params)
        render "api/users/show"
      else
        render json: @user.errors.full_messages, status: 422
      end
    else
      render json: ["You cannot change another user's information"], status: 401
    end
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

  def user_update_params
    params.require(:user).permit(:username, :password, :email, :profile_image, :background_image)
  end
end
