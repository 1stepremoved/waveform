Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update, :destroy] do
      resources :tracks, only: [:index]
    end
    resources :tracks, only: [:create, :show, :index, :update, :destroy]
    resource :session, only: [:create, :show, :destroy]
  end

  root "static_pages#root"
end
