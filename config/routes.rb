Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # front
  scope module: "front" do
    root "posts#index"
    resources :posts, only: [ :show ] do
      resources :comments, only: [ :create ]
    end
   end

  # admin
  namespace :admin do
    root "home#index"
    resources :posts
    resource :profile, only: [ :show, :edit, :update ]
  end
  devise_for :users, path: "admin", skip: [ :registrations ], module: "users"
  devise_scope :user do
    get  "admin/sign_up", to: "users/registrations#new",    as: :new_user_registration
    post "admin/sign_up", to: "users/registrations#create", as: :user_registration
  end

  # letter_opener
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
