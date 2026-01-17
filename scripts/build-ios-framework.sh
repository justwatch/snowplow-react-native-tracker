#!/bin/bash
#
# Build XCFramework from the forked snowplow-objc-tracker repo
# This script clones the repo, builds the framework, and copies it to ios/Frameworks/
#
# Requirements: Carthage must be installed (brew install carthage)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
TEMP_DIR=$(mktemp -d)
FRAMEWORK_NAME="SnowplowTracker"
REPO_URL="https://github.com/micheleb/snowplow-objc-tracker.git"
BRANCH="master"

echo "Building SnowplowTracker.xcframework from $REPO_URL..."
echo "Temp directory: $TEMP_DIR"

# Clone the forked repo
cd "$TEMP_DIR"
git clone --depth 1 --branch "$BRANCH" "$REPO_URL" snowplow-objc-tracker
cd snowplow-objc-tracker

# Fetch dependencies using Carthage
echo "Fetching Carthage dependencies..."
carthage bootstrap --use-xcframeworks --platform iOS

# Build for iOS device
echo "Building for iOS device..."
xcodebuild archive \
  -scheme Snowplow-iOS \
  -configuration Release \
  -destination "generic/platform=iOS" \
  -archivePath "$TEMP_DIR/archives/Snowplow-iOS" \
  SKIP_INSTALL=NO \
  BUILD_LIBRARY_FOR_DISTRIBUTION=YES \
  ONLY_ACTIVE_ARCH=NO

# Build for iOS simulator
echo "Building for iOS simulator..."
xcodebuild archive \
  -scheme Snowplow-iOS \
  -configuration Release \
  -destination "generic/platform=iOS Simulator" \
  -archivePath "$TEMP_DIR/archives/Snowplow-iOS-Simulator" \
  SKIP_INSTALL=NO \
  BUILD_LIBRARY_FOR_DISTRIBUTION=YES \
  ONLY_ACTIVE_ARCH=NO

# Create XCFramework
echo "Creating XCFramework..."
xcodebuild -create-xcframework \
  -framework "$TEMP_DIR/archives/Snowplow-iOS.xcarchive/Products/Library/Frameworks/SnowplowTracker.framework" \
  -framework "$TEMP_DIR/archives/Snowplow-iOS-Simulator.xcarchive/Products/Library/Frameworks/SnowplowTracker.framework" \
  -output "$TEMP_DIR/SnowplowTracker.xcframework"

# Copy to ios/Frameworks
echo "Copying to $ROOT_DIR/ios/Frameworks/..."
rm -rf "$ROOT_DIR/ios/Frameworks/SnowplowTracker.xcframework"
cp -R "$TEMP_DIR/SnowplowTracker.xcframework" "$ROOT_DIR/ios/Frameworks/"

# Cleanup
echo "Cleaning up..."
rm -rf "$TEMP_DIR"

echo "Done! XCFramework created at ios/Frameworks/SnowplowTracker.xcframework"
