class Api::TracksController < ApplicationController

  def index
    offset = params[:offset] ? params[:offset].to_i : 0
    num = params[:num] ? params[:num].to_i : 12
    if (params[:user_id])
      @tracks = User.find(params[:user_id].to_i).tracks.where("LOWER(title) LIKE (?)", "#{params[:query]}%").order('created_at DESC')
      @total_tracks = @tracks.length
      @user_id = params[:user_id]
      @tracks = @tracks.limit(num).offset(offset)
    elsif (params[:liked])
      @tracks = current_user.liked_tracks.where("LOWER(title) LIKE LOWER(?)", "%#{params[:query]}%").order('created_at DESC')
      @total_tracks = @tracks.length
      @user_id = nil
      @tracks = @tracks.limit(num).offset(offset)
    else
      @tracks = Track.where("LOWER(title) LIKE LOWER(?)", "%#{params[:query]}%").order('created_at DESC')
      @total_tracks = @tracks.length
      @user_id = nil
      @tracks = @tracks.limit(num).offset(offset)
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
