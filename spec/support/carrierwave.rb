RSpec.configure do |config|
  config.after(:each) do
    # Clean up uploaded files after each test
    if Rails.root.join('public/uploads').exist?
      FileUtils.rm_rf(Dir["#{Rails.root}/public/uploads/[^.]*"])
    end
  end
end

# In order to speed up your tests
if Rails.env.test?
  CarrierWave.configure do |config|
    config.storage = :file
    config.enable_processing = false
    config.skip_ssrf_protection = true
  end
end
