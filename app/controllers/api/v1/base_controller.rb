class Api::V1::BaseController < Api::BaseController
  include Api::Respondable

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  private

  def record_not_found
    render_error message: "Record not found", status: :not_found
  end
end
