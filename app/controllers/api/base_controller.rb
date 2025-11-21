class Api::BaseController < ActionController::API
  include ActionController::MimeResponds
  include Api::Respondable
end
