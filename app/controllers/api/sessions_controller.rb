class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_creds(params[:user][:username],params[:user][:password])
    if @user
      login(@user)
      render "api/users/show"
    else
      render json: ["Incorrect username or password"]
    end
  end

  def show
  end

  def destroy
    @user = current_user
    if logged_in?
      logout
      render "api/users/show"
    else
      render json: ["Not signed in"]
    end
  end
end
