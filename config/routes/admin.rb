namespace :admin do
  resources :posts
  resources :profile, only: [ :show, :edit, :update ]
end
devise_for :users, path: "admin", skip: [ :registrations ], module: "api/v1/users"
devise_scope :user do
  post "admin/sign_up", to: "users/registrations#create", as: :api_v1_user_registration
  post "admin/sign_in", to: "users/sessions#create",      as: :api_v1_user_session
end