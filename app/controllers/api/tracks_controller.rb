class Api::TracksController < ApplicationController

  def index
    offset = params[:offset] ? params[:offset].to_i : 0
    @tracks = Track.where("title LIKE ?", "%#{params[:query]}%").limit(10).offset(offset)
    render "api/tracks/index"
  end

  def show
    @track = Track.find(params[:id])
    render "api/tracks/show"
  end

  def create
    @track = Track.create(track_params)
    if @track.save
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def update
    @track = Track.find(params[:id])
    if @track.user_id == current_user.id
      if @track.update(update_track_params)
        render "api/tracks/show"
      else
        render json: @track.errors.full_messages, status: 422
      end
    else
      render json: ["Users can only update their own tracks"], status: 401
    end
  end

  def destroy
    @track = Track.find_by(id: params[:id])
    if @track
      if @track.user_id == current_user.id
        if @track.destroy
          render "api/tracks/show"
        else
          render json: ["There was a problem deleting your track"],status: 402
        end
      else
        render json: ["Users can only delete their own tracks"],status: 401
      end
    else
      render json: ["Could not find track"], status: 422
    end
  end

  private
  def track_params
    params.require(:track).permit(:title, :description, :user_id, :playlist_id, :playlist_ord, :audio, :image)
  end

  def update_track_params
    params.require(:track).permit(:title, :description, :playlist_id, :playlist_ord, :image)
  end
end
