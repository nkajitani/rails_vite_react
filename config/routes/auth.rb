devise_for :user, module: 'api/v1/auth', path: 'api/v1/auth', skip: [:registrations], defaults: { format: :json }

scope defaults: { format: :json } do
    devise_scope :user do
      get  'api/v1/auth/sign_up', to: 'api/v1/auth/registrations#new',     as: :new_user_registration
      post 'api/v1/auth/sign_up', to: 'api/v1/auth/registrations#create',  as: :user_registration
    end
end