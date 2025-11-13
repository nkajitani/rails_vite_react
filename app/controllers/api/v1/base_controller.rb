class Api::V1::BaseController < Api::BaseController
  # include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end
end
