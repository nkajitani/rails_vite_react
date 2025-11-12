namespace :admin do
  resources :posts
  resources :profile, only: [ :show, :edit, :update ]
end
