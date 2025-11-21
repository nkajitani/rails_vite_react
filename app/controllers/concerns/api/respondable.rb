module Api
  module Respondable
    extend ActiveSupport::Concern

    included do
      def render_success(data: {}, message: 'Success', status: :ok)
        render_json(message: message, data: data, status: status)
      end

      def render_error(data: {}, errors: {}, message: 'Error', status: :unprocessable_entity)
        render_json(message: message, data: data, errors: errors, status: status)
      end

      private

      def render_json(message:, data: nil, errors: nil, status: :ok)
        payload = { message: message, data: data, errors: errors }.compact
        render json: payload, status: status
      end
    end
  end
end
