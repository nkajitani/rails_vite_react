# frozen_string_literal: true

class Api::V1::Auth::SessionsController < Devise::SessionsController
  include Api::Respondable

  # protect_from_forgery with: :null_session, if: -> { request.format.json? }

  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    render_success data: { user: resource.as_json(only: [:id, :email, :name]) },
                   message: "Signed in successfully."
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render_success data: {}, message: "Signed out successfully."
  end

  # for vanilla Rails app
  # def after_sign_in_path_for(resource)
  #   admin_root_path  # 管理画面TOPへ
  # end

  # for vanilla Rails app
  # def after_sign_out_path_for(resource_or_scope)
  #   new_user_session_path
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
