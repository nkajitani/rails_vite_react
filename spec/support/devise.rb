RSpec.configure do |config|
  # for request specs
  config.include Devise::Test::IntegrationHelpers, type: :request

  # for controller specs settings
  ## config.include Devise::Test::ControllerHelpers, type: :controller
  ## Set up Devise mapping for controller tests
  config.before(:each, type: :request) do
    if defined?(@request) && @request
      @request.env['devise.mapping'] = Devise.mappings[:user]
    end
  end

  # reload routes to populate Devise.mappings for isolated runs, since controller specs don’t initialize routes automatically.
  # `:suite` hooks do not support metadata since they apply to the suite as a whole rather than any individual example or example group that has metadata.
  config.before(:suite) do
    Rails.application.reload_routes!
  end
end
