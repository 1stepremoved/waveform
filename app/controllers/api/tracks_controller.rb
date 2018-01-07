class Api::TracksController < ApplicationController

  def index
    if params[:query]
      @tracks = Track.where("title LIKE ?", "%#{params[:query]}%").limit(10).offset(params[:offset])
    else
      @tracks = Track.all.limit(10).offset(params[:offset])
    end
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
    if @track.update(update_track_params)
      render "api/tracks/show"
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    render "api/tracks/show"
  end

  private
  def track_params
    params.require(:track).permit(:title, :description, :user_id, :playlist_id, :playlist_ord, :audio, :image)
  end

  def update_track_params
    params.require(:track).permit(:title, :description, :playlist_id, :playlist_ord, :image)
  end
end
