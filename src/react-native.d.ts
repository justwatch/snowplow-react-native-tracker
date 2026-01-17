// Minimal type declarations for react-native
// This avoids the peer dependency conflicts from @types/react-native

declare module 'react-native' {
  interface RNSnowplowTrackerInterface {
    createTracker(config: unknown): Promise<void>;
    removeTracker(args: { tracker: string }): Promise<boolean>;
    removeAllTrackers(): Promise<boolean>;
    trackSelfDescribingEvent(args: unknown): Promise<void>;
    trackScreenViewEvent(args: unknown): Promise<void>;
    trackStructuredEvent(args: unknown): Promise<void>;
    trackPageViewEvent(args: unknown): Promise<void>;
    trackTimingEvent(args: unknown): Promise<void>;
    trackConsentGrantedEvent(args: unknown): Promise<void>;
    trackConsentWithdrawnEvent(args: unknown): Promise<void>;
    trackEcommerceTransactionEvent(args: unknown): Promise<void>;
    removeGlobalContexts(args: unknown): Promise<void>;
    addGlobalContexts(args: unknown): Promise<void>;
    setUserId(args: unknown): Promise<void>;
    setNetworkUserId(args: unknown): Promise<void>;
    setDomainUserId(args: unknown): Promise<void>;
    setIpAddress(args: unknown): Promise<void>;
    setUseragent(args: unknown): Promise<void>;
    setTimezone(args: unknown): Promise<void>;
    setLanguage(args: unknown): Promise<void>;
    setScreenResolution(args: unknown): Promise<void>;
    setScreenViewport(args: unknown): Promise<void>;
    setColorDepth(args: unknown): Promise<void>;
    setSubjectData(args: unknown): Promise<void>;
    getSessionUserId(args: { tracker: string }): Promise<string>;
    getSessionId(args: { tracker: string }): Promise<string>;
    getSessionIndex(args: { tracker: string }): Promise<number>;
    getIsInBackground(args: { tracker: string }): Promise<boolean>;
    getBackgroundIndex(args: { tracker: string }): Promise<number>;
    getForegroundIndex(args: { tracker: string }): Promise<number>;
  }

  export const NativeModules: {
    RNSnowplowTracker: RNSnowplowTrackerInterface;
    [key: string]: unknown;
  };
}

// React Native globals
declare const __DEV__: boolean;

// Console (available in React Native runtime)
declare const console: {
  log(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
  info(...args: unknown[]): void;
  debug(...args: unknown[]): void;
};
