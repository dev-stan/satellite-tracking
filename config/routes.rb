Rails.application.routes.draw do
  get "profiles/show"
  devise_for :users
  resource :profile, only: [:show]
  root to: "pages#home"
  get "search", to: "pages#search"
end
