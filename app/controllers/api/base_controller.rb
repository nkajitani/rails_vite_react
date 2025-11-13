class Api::BaseController < ActionController::API
  include ActionController::MimeResponds

  respond_to :json  
end
