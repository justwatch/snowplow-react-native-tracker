# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Snowplow React Native Tracker - a TypeScript library that wraps native iOS (Objective-C) and Android (Java) Snowplow trackers to enable event tracking in React Native apps.

## Common Commands

```bash
# Build the library (TypeScript → ES module)
npm run build

# Run unit tests
npm test

# Lint code
npm run lint

# Full setup including DemoApp
npm run bootstrap
```

### DemoApp Development

```bash
cd DemoApp
yarn android          # Run on Android
yarn ios              # Run on iOS (run `yarn pods` first)
```

Quick test scripts from repo root:
```bash
bash .scripts/quickTest.sh android|ios|both
bash .scripts/cleanBuildAndRun.sh android|ios|both
```

### E2E Testing (requires Docker)

```bash
cd DemoApp
yarn e2e:android:micro    # Android with Snowplow Micro
yarn e2e:ios:micro        # iOS with Snowplow Micro
```

## Architecture

### Source Structure

- **src/** - TypeScript library source
  - `index.ts` - Public API: `createTracker()`, `removeTracker()`, `removeAllTrackers()`
  - `api.ts` - Tracker API implementation
  - `tracker.ts` - Core tracker logic
  - `types.ts` - All TypeScript type definitions
  - `native.ts` - React Native bridge to native modules

- **android/** - Java native module (`RNSnowplowTrackerModule.java`)
- **ios/** - Objective-C native module (`RNSnowplowTracker.m`)
- **DemoApp/** - Complete React Native app for testing

### Native Bridge Pattern

The tracker is a thin TypeScript wrapper that delegates to native Snowplow trackers via React Native's native module bridge. The JS layer handles configuration and type safety; actual tracking happens in native code.

### Build Output

`npm run build` produces:
- `dist/index.js` - Bundled ES module
- `dist/index.d.ts` - TypeScript declarations

## Commit Convention

Format: `Issue Description (closes #1234)`

Example: `Fix Issue with Tracker (closes #1234)`
