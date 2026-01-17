/**
 * HttpMethod type
 */
type HttpMethod = "post" | "get";
/**
 * DevicePlatform type
 */
type DevicePlatform = "web" | "mob" | "pc" | "srv" | "app" | "tv" | "cnsl" | "iot";
/**
 * LogLevel type
 */
type LogLevel = "off" | "error" | "debug" | "verbose";
/**
 * BasisForProsessing
 */
type Basis = "consent" | "contract" | "legal_obligation" | "legitimate_interests" | "public_task" | "vital_interests";
/**
 * BufferOption
 */
type BufferOption = "single" | "default" | "large";
/**
 * ScreenSize
 */
type ScreenSize = [number, number];
/**
 * SelfDescribing type
 */
type SelfDescribing = {
    /**
     * Schema
     */
    schema: string;
    /**
     * Data
     */
    data: Record<string, unknown>;
};
/**
 * EventContext type
 */
type EventContext = SelfDescribing;
/**
 * NetworkConfiguration
 */
interface NetworkConfiguration {
    /**
     * The collector endpoint
     *  - if the protocol is not included it defaults to https
     */
    endpoint: string;
    /**
     * The Http Method to use when sending events to the collector
     * @defaultValue 'post'
     */
    method?: HttpMethod;
}
/**
 * TrackerConfiguration
 */
interface TrackerConfiguration {
    /**
     * Identifier of the app.
     */
    appId?: string;
    /**
     * The device platform the tracker runs on.
     * @defaultValue 'mob'
     */
    devicePlatform?: DevicePlatform;
    /**
     * Whether payload JSON data should be base64 encoded.
     * @defaultValue true
     */
    base64Encoding?: boolean;
    /**
     * The log level of tracker logs.
     * @defaultValue 'off'
     */
    logLevel?: LogLevel;
    /**
     * Whether application context is attached to tracked events.
     * @defaultValue true
     */
    applicationContext?: boolean;
    /**
     * Whether platform context is attached to tracked events.
     * @defaultValue true
     */
    platformContext?: boolean;
    /**
     * Whether geo-location context is attached to tracked events.
     * @defaultValue false
     */
    geoLocationContext?: boolean;
    /**
     * Whether session context is attached to tracked events.
     * @defaultValue true
     */
    sessionContext?: boolean;
    /**
     * Whether screen context is attached to tracked events.
     * @defaultValue true
     */
    screenContext?: boolean;
    /**
     * Whether enable automatic tracking of ScreenView events.
     * @defaultValue true
     */
    screenViewAutotracking?: boolean;
    /**
     * Whether enable automatic tracking of background and foreground transitions.
     * @defaultValue false
     */
    lifecycleAutotracking?: boolean;
    /**
     * Whether enable automatic tracking of install event.
     * @defaultValue true
     */
    installAutotracking?: boolean;
    /**
     * Whether enable crash reporting.
     * @defaultValue true
     */
    exceptionAutotracking?: boolean;
    /**
     * Whether enable diagnostic reporting.
     * @defaultValue false
     */
    diagnosticAutotracking?: boolean;
}
/**
 * SessionConfiguration
 */
interface SessionConfiguration {
    /**
     * The amount of time in seconds before the session id is updated while the app is in the foreground
     * @defaultValue 1800
     */
    foregroundTimeout: number;
    /**
     * The amount of time in seconds before the session id is updated while the app is in the background
     * @defaultValue 1800
     */
    backgroundTimeout: number;
}
/**
 * EmitterConfiguration
 */
interface EmitterConfiguration {
    /**
     * The buffer option for post requests.
     * @defaultValue 'single'
     */
    bufferOption?: BufferOption;
    /**
     * Maximum number of events collected from the EventStore to be sent in a request.
     * @defaultValue 150
     */
    emitRange?: number;
    /**
     *Maximum number of threads working in parallel in the tracker to send requests.
     * @defaultValue 15
     */
    threadPoolSize?: number;
    /**
     * Maximum amount of bytes allowed to be sent in a payload in a POST request.
     * @defaultValue 40000
     */
    byteLimitPost?: number;
    /**
     * Maximum amount of bytes allowed to be sent in a payload in a GET request.
     * @defaultValue 40000
     */
    byteLimitGet?: number;
}
/**
 * SubjectConfiguration
 */
interface SubjectConfiguration {
    [index: string]: unknown;
    /**
     * user id
     */
    userId?: string | null;
    /**
     * network user id (UUIDv4)
     */
    networkUserId?: string | null;
    /**
     * domain user id
     */
    domainUserId?: string | null;
    /**
     * The custom user-agent. It overrides the user-agent used by default.
     */
    useragent?: string | null;
    /**
     * IP address
     */
    ipAddress?: string | null;
    /**
     * The timezone label
     */
    timezone?: string | null;
    /**
     * The language set in the device
     */
    language?: string | null;
    /**
     * The screen resolution
     */
    screenResolution?: ScreenSize | null;
    /**
     * The screen viewport size
     */
    screenViewport?: ScreenSize | null;
    /**
     * color depth (integer)
     */
    colorDepth?: number | null;
}
/**
 * GdprConfiguration
 */
interface GdprConfiguration {
    /**
     * Basis for processing
     */
    basisForProcessing: Basis;
    /**
     * ID of a GDPR basis document.
     */
    documentId: string;
    /**
     * Version of the document.
     */
    documentVersion: string;
    /**
     * Description of the document.
     */
    documentDescription: string;
}
/**
 * Global Context
 */
interface GlobalContext {
    /**
     * tag
     */
    tag: string;
    /**
     * contexts
     */
    globalContexts: SelfDescribing[];
}
/**
 * Global Contexts configuration
 */
type GCConfiguration = GlobalContext[];
/**
 * The TrackerControllerConfiguration
 */
interface TrackerControllerConfiguration {
    trackerConfig?: TrackerConfiguration;
    sessionConfig?: SessionConfiguration;
    emitterConfig?: EmitterConfiguration;
    subjectConfig?: SubjectConfiguration;
    gdprConfig?: GdprConfiguration;
    gcConfig?: GCConfiguration;
}
/**
 * ScreenView event properties
 * schema: iglu:com.snowplowanalytics.mobile/screen_view/jsonschema/1-0-0
 */
type ScreenViewProps = {
    /**
     * The name of the screen viewed
     */
    name: string;
    /**
     * The id(UUID) of screen that was viewed
     */
    id?: string;
    /**
     * The type of screen that was viewed
     */
    type?: string;
    /**
     * The name of the previous screen that was viewed
     */
    previousName?: string;
    /**
     * The id(UUID) of the previous screen that was viewed
     */
    previousId?: string;
    /**
     * The type of the previous screen that was viewed
     */
    previousType?: string;
    /**
     * The type of transition that led to the screen being viewed
     */
    transitionType?: string;
};
/**
 * Structured event properties
 */
type StructuredProps = {
    /**
     * The category of the event
     */
    category: string;
    /**
     * The action the event represents
     */
    action: string;
    /**
     * The label the action refers to
     */
    label?: string;
    /**
     * The property associated with the user action
     */
    property?: string;
    /**
     * The value associated with the user action
     */
    value?: number;
    /**
     * The URL of the current page (JW-specific)
     */
    pageUrl?: string;
    /**
     * The URL of the page from which we're coming (JW-specific)
     */
    referrer?: string;
};
/**
 * PageView event properties
 */
type PageViewProps = {
    /**
     * The page URL
     */
    pageUrl: string;
    /**
     * The page title
     */
    pageTitle?: string;
    /**
     * The referrer URL
     */
    referrer?: string;
};
/**
 * Timing event properties
 */
type TimingProps = {
    /**
     * The timing category
     */
    category: string;
    /**
     * The timing variable
     */
    variable: string;
    /**
     * The time
     */
    timing: number;
    /**
     * The timing label
     */
    label?: string;
};
/**
 * ConsentDocument properties
 */
interface ConsentDocument {
    /**
     * The consent document id
     */
    documentId: string;
    /**
     * The consent document version
     */
    version: string;
    /**
     * The consent document name
     */
    name?: string;
    /**
     * The consent document description
     */
    documentDescription?: string;
}
/**
 * ConsentGranted event properties
 */
interface ConsentGrantedProps extends ConsentDocument {
    /**
     * The expiry (date-time string, e.g.: '2022-01-01T00:00:00Z')
     */
    expiry: string;
}
/**
 * ConsentWithdrawn event properties
 */
interface ConsentWithdrawnProps extends ConsentDocument {
    /**
     * Whether user opts out of all data collection
     */
    all: boolean;
}
/**
 * EcommerceItem
 */
type EcommerceItem = {
    sku: string;
    price: number;
    quantity: number;
    name?: string;
    category?: string;
    currency?: string;
};
/**
 * EcommerceTransaction event properties
 */
type EcommerceTransactionProps = {
    orderId: string;
    totalValue: number;
    items: EcommerceItem[];
    affiliation?: string;
    taxValue?: number;
    shipping?: number;
    city?: string;
    state?: string;
    country?: string;
    currency?: string;
};
/**
 * The ReactNativeTracker type
 */
type ReactNativeTracker = {
    /**
     * Tracks a self-descibing event
     *
     * @param argmap - The self-describing event properties
     * @param contexts - The array of event contexts
     */
    readonly trackSelfDescribingEvent: (argmap: SelfDescribing, contexts?: EventContext[]) => Promise<void>;
    /**
     * Tracks a screen-view event
     *
     * @param argmap - The screen-view event's properties
     * @param contexts - The array of event contexts
     */
    readonly trackScreenViewEvent: (argmap: ScreenViewProps, contexts?: EventContext[]) => Promise<void>;
    /**
     * Tracks a structured event
     *
     * @param argmap - The structured event properties
     * @param contexts - The array of event contexts
     */
    readonly trackStructuredEvent: (argmap: StructuredProps, contexts?: EventContext[]) => Promise<void>;
    /**
     * Tracks a page-view event
     *
     * @param argmap - The page-view event properties
     * @param contexts - The array of event contexts
     */
    readonly trackPageViewEvent: (argmap: PageViewProps, contexts?: EventContext[]) => Promise<void>;
    /**
     * Tracks a timing event
     *
     * @param argmap - The timing event properties
     * @param contexts - The array of event contexts
     */
    readonly trackTimingEvent: (argmap: TimingProps, contexts?: EventContext[]) => Promise<void>;
    /**
     * Tracks a consent-granted event
     *
     * @param argmap - The consent-granted event properties
     * @param contexts - The array of event contexts
     */
    readonly trackConsentGrantedEvent: (argmap: ConsentGrantedProps, contexts?: EventContext[]) => Promise<void>;
    /**
     * Tracks a consent-withdrawn event
     *
     * @param argmap - The consent-withdrawn event properties
     * @param contexts - The array of event contexts
     */
    readonly trackConsentWithdrawnEvent: (argmap: ConsentWithdrawnProps, contexts?: EventContext[]) => Promise<void>;
    /**
     * Tracks an ecommerce-transaction event
     *
     * @param argmap - The ecommerce-transaction event properties
     * @param contexts - The array of event contexts
     */
    readonly trackEcommerceTransactionEvent: (argmap: EcommerceTransactionProps, contexts?: EventContext[]) => Promise<void>;
    /**
     * Removes global contexts
     *
     * @param tag - The tag of the global contexts to remove
     */
    readonly removeGlobalContexts: (tag: string) => Promise<void>;
    /**
     * Adds global contexts
     *
     * @param gc - The global context to add
     */
    readonly addGlobalContexts: (gc: GlobalContext) => Promise<void>;
    /**
     * Sets the userId of the tracker subject
     *
     * @param newUid - The new userId
     */
    readonly setUserId: (newUid: string | null) => Promise<void>;
    /**
     * Sets the networkUserId of the tracker subject
     *
     * @param newNuid - The new networkUserId
     */
    readonly setNetworkUserId: (newNuid: string | null) => Promise<void>;
    /**
     * Sets the domainUserId of the tracker subject
     *
     * @param newDuid - The new domainUserId
     */
    readonly setDomainUserId: (newDuid: string | null) => Promise<void>;
    /**
     * Sets the ipAddress of the tracker subject
     *
     * @param newIp - The new ipAddress
     */
    readonly setIpAddress: (newIp: string | null) => Promise<void>;
    /**
     * Sets the useragent of the tracker subject
     *
     * @param newUagent - The new useragent
     */
    readonly setUseragent: (newUagent: string | null) => Promise<void>;
    /**
     * Sets the timezone of the tracker subject
     *
     * @param newTz - The new timezone
     */
    readonly setTimezone: (newTz: string | null) => Promise<void>;
    /**
     * Sets the language of the tracker subject
     *
     * @param newLang - The new language
     */
    readonly setLanguage: (newLang: string | null) => Promise<void>;
    /**
     * Sets the screenResolution of the tracker subject
     *
     * @param newRes - The new screenResolution
     */
    readonly setScreenResolution: (newRes: ScreenSize | null) => Promise<void>;
    /**
     * Sets the screenViewport of the tracker subject
     *
     * @param newView - The new screenViewport
     */
    readonly setScreenViewport: (newView: ScreenSize | null) => Promise<void>;
    /**
     * Sets the colorDepth of the tracker subject
     *
     * @param newColorD - The new colorDepth
     */
    readonly setColorDepth: (newLang: number | null) => Promise<void>;
    /**
     * Sets subject data
     *
     * @param config - The new subject data
     */
    readonly setSubjectData: (config: SubjectConfiguration) => Promise<void>;
    /**
     * Gets the dentifier for the user of the session
     *
     * @returns {Promise<string | undefined>}
     */
    readonly getSessionUserId: () => Promise<string | undefined>;
    /**
     * Gets the identifier for the session
     *
     * @returns {Promise<string | undefined>}
     */
    readonly getSessionId: () => Promise<string | undefined>;
    /**
     * Gets the index of the current session for this user
     *
     * @returns {Promise<number | undefined>}
     */
    readonly getSessionIndex: () => Promise<number | undefined>;
    /**
     * Gets whether the app is currently in background state
     *
     * @returns {Promise<boolean | undefined>}
     */
    readonly getIsInBackground: () => Promise<boolean | undefined>;
    /**
     * Gets the number of background transitions in the current session
     *
     * @returns {Promise<number | undefined>}
     */
    readonly getBackgroundIndex: () => Promise<number | undefined>;
    /**
     * Gets the number of foreground transitions in the current session.
     *
     * @returns {Promise<number | undefined>}
     */
    readonly getForegroundIndex: () => Promise<number | undefined>;
};

/**
 * Creates a React Native Tracker object
 *
 * @param namespace {string} - The tracker namespace
 * @param networkConfig {Object} - The network configuration
 * @param control {Array} - The tracker controller configuration
 * @returns The tracker object
 */
declare function createTracker(namespace: string, networkConfig: NetworkConfiguration, controllerConfig?: TrackerControllerConfiguration): ReactNativeTracker;
/**
 * Removes a tracker given its namespace
 *
 * @param trackerNamespace {string}
 * @returns - A boolean promise
 */
declare function removeTracker(trackerNamespace: string): Promise<boolean>;
/**
 * Removes all trackers
 *
 * @returns - A boolean promise
 */
declare function removeAllTrackers(): Promise<boolean>;

export { createTracker, removeAllTrackers, removeTracker };
export type { Basis, BufferOption, ConsentDocument, ConsentGrantedProps, ConsentWithdrawnProps, DevicePlatform, EcommerceItem, EcommerceTransactionProps, EmitterConfiguration, EventContext, GCConfiguration, GdprConfiguration, GlobalContext, HttpMethod, LogLevel, NetworkConfiguration, PageViewProps, ReactNativeTracker, ScreenSize, ScreenViewProps, SelfDescribing, SessionConfiguration, StructuredProps, SubjectConfiguration, TimingProps, TrackerConfiguration, TrackerControllerConfiguration };
