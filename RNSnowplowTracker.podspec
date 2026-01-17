require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "RNSnowplowTracker"
  s.version      = package['version']
  s.license      = package['license']

  s.summary      = "Snowplow React Native tracker"
  s.description  = package['description']
  s.homepage     = package['homepage']
  s.author       = { "Snowplow Analytics Ltd" => "info@snowplowanalytics.com" }

  s.platforms    = { :ios => "11.0", :tvos => "11.0" }

  s.source       = { :git => "https://github.com/micheleb/snowplow-react-native-tracker.git", :tag => "#{s.version}" }
  s.source_files = "ios/**/*.{h,m}"

  s.requires_arc = true

  s.dependency "React-Core"
  # Note: For pageUrl/referrer support, we use a forked SnowplowTracker.
  # The Expo plugin adds the git source override automatically.
  s.dependency "SnowplowTracker", "~> 2.2"
end
