import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  createTracker,
  removeTracker,
} from '@snowplow/react-native-tracker';

const Colors = {
  white: '#fff',
  black: '#000',
  light: '#ddd',
  dark: '#333',
  lighter: '#f3f3f3',
  darker: '#222',
  primary: '#6200EE',
};

interface SectionProps {
  children: React.ReactNode;
  title: string;
}

const Section = ({ children, title }: SectionProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Header = () => {
  return (
    <View style={[styles.header, { backgroundColor: Colors.primary }]}>
      <Text style={styles.headerTitle}>Snowplow React Native Tracker</Text>
      <Text style={styles.headerSubtitle}>Expo Demo Application</Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const tracker = createTracker(
    'sp1',
    {
      endpoint: 'http://localhost:9090',
    },
    {
      trackerConfig: {
        appId: 'DemoExpoAppId',
        base64Encoding: false,
        devicePlatform: 'mob',
        screenViewAutotracking: false,
        installAutotracking: false,
      },
      subjectConfig: {
        userId: 'tester',
        screenViewport: [200, 200],
        language: 'en',
      },
      gdprConfig: {
        basisForProcessing: 'consent',
        documentId: 'docId',
        documentVersion: '0.0.1',
        documentDescription: 'test gdpr document',
      },
      gcConfig: [
        {
          tag: 'testTag',
          globalContexts: [
            {
              schema:
                'iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0',
              data: { impressionId: 'test_global_contexts_0' },
            },
          ],
        },
      ],
    },
  );

  const secTracker = createTracker(
    'sp2',
    {
      endpoint: 'http://localhost:9090',
    },
    {
      trackerConfig: {
        screenViewAutotracking: false,
        installAutotracking: false,
      },
    },
  );

  const onPressTrackScreenViewEvent = () => {
    tracker.trackScreenViewEvent({ name: 'onlyRequired' });
    tracker.trackScreenViewEvent({
      name: 'allPopulated',
      type: 'allPopulated',
      transitionType: 'test',
    });
    tracker.trackScreenViewEvent(
      {
        name: 'withContext and screenId',
        id: '5d79770b-015b-4af8-8c91-b2ed6faf4b1e',
      },
      [
        {
          schema:
            'iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0',
          data: { impressionId: 'test_imp_id' },
        },
      ],
    );
  };

  const onPressTrackSelfDescribingEvent = () => {
    tracker.trackSelfDescribingEvent({
      schema: 'iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1',
      data: { targetUrl: 'test.test' },
    });
    tracker.trackTimingEvent({
      category: 'testTimingCategory',
      variable: 'testTimingVariable',
      timing: 10,
    });
    tracker.trackConsentGrantedEvent({
      expiry: '2022-01-01T00:00:00Z',
      documentId: '0123',
      version: '0.1.0',
    });
    tracker.trackConsentWithdrawnEvent({
      all: true,
      documentId: '0987',
      version: '0.2.0',
    });
    tracker.trackEcommerceTransactionEvent(
      {
        orderId: '0000',
        totalValue: 10,
        items: [
          {
            sku: '123',
            price: 5,
            quantity: 2,
          },
        ],
      },
      [],
    );
  };

  const onPressTrackStructuredEvent = () => {
    tracker.trackStructuredEvent({
      category: 'SeTest',
      action: 'allPopulated',
      label: 'valueIsFloat',
      property: 'property',
      value: 50.1,
    });
    tracker.trackStructuredEvent({ category: 'SeTest', action: 'onlyRequired' });
  };

  const onPressTrackStructuredWithPageUrl = () => {
    tracker.trackStructuredEvent({
      category: 'NavigationTest',
      action: 'pageVisit',
      label: 'withPageUrlAndReferrer',
      pageUrl: 'https://example.com/current-page',
      referrer: 'https://example.com/previous-page',
    });
  };

  const onPressTrackPageViewEvent = () => {
    tracker.trackPageViewEvent({
      pageUrl: 'https://allpopulated.com',
      pageTitle: 'some title',
      referrer: 'http://refr.com',
    });
    tracker.trackPageViewEvent({ pageUrl: 'https://onlyrequired.com' });
  };

  const onPressTestSetSubject = async () => {
    try {
      await tracker.setSubjectData({
        userId: 'nextTester',
        domainUserId: '5d79770b-015b-4af8-8c91-b2ed6faf4b1e',
        language: 'es',
        colorDepth: 50,
        timezone: 'Europe/London',
        screenResolution: [300, 300],
      });
      await tracker.trackScreenViewEvent({ name: 'afterSetSubjectTestSV' });
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const onPressTestSecondTracker = () => {
    secTracker.trackScreenViewEvent({ name: 'fromSecondTracker' });
    secTracker.trackStructuredEvent({
      category: 'SecTracker',
      action: 'trackStructured',
    });
  };

  const onPressPlayGC = async () => {
    try {
      await tracker.removeGlobalContexts('testTag');
      await tracker.addGlobalContexts({
        tag: 'testTagReloaded',
        globalContexts: [
          {
            schema:
              'iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0',
            data: { impressionId: 'test_global_contexts_Reloaded' },
          },
        ],
      });
      await tracker.trackPageViewEvent({ pageUrl: 'afterGCChange.test' });
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const onPressRemoveSecTracker = () => {
    removeTracker('sp2');
  };

  const onPressLogSessionData = async () => {
    try {
      const sessionUserId = await tracker.getSessionUserId();
      const sessionId = await tracker.getSessionId();
      const sessionIdx = await tracker.getSessionIndex();
      const isInBg = await tracker.getIsInBackground();
      const bgIndex = await tracker.getBackgroundIndex();
      const fgIndex = await tracker.getForegroundIndex();

      const sessionData = {
        userId: sessionUserId,
        sessionId: sessionId,
        sessionIndex: sessionIdx,
        isInBackground: isInBg,
        backgroundIndex: bgIndex,
        foregroundIndex: fgIndex,
      };
      console.log(
        'SnowplowTracker: Session Data: ' + JSON.stringify(sessionData),
      );
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        testID="scrollView"
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Screen Views">
            <Button
              onPress={onPressTrackScreenViewEvent}
              title="Track some Screen View Events"
              color="#841584"
              accessibilityLabel="testScreenView"
            />
          </Section>
          <Section title="Self-Describing Events">
            <Button
              onPress={onPressTrackSelfDescribingEvent}
              title="Track some Self-Describing Events"
              color="#841584"
              accessibilityLabel="testSelfDesc"
            />
          </Section>
          <Section title="Structured Events">
            <Button
              onPress={onPressTrackStructuredEvent}
              title="Track some Structured Events"
              color="#841584"
              accessibilityLabel="testStruct"
            />
          </Section>
          <Section title="Structured with Page URL">
            <Button
              onPress={onPressTrackStructuredWithPageUrl}
              title="Track Structured with pageUrl & referrer"
              color="#841584"
              accessibilityLabel="testStructWithPageUrl"
            />
          </Section>
          <Section title="Page Views">
            <Button
              onPress={onPressTrackPageViewEvent}
              title="Track some Page View Events"
              color="#841584"
              accessibilityLabel="testPageView"
            />
          </Section>
          <Section title="Second tracker">
            <Button
              onPress={onPressTestSecondTracker}
              title="Track events with second tracker"
              color="#841584"
              accessibilityLabel="testSecTracker"
            />
          </Section>
          <Section title="Set the Subject">
            <Button
              onPress={onPressTestSetSubject}
              title="Set the Subject again"
              color="#228B22"
              accessibilityLabel="testSetSubject"
            />
          </Section>
          <Section title="SessionData">
            <Button
              onPress={onPressLogSessionData}
              title="Show me session data"
              color="#f6bd3b"
              accessibilityLabel="testSessionData"
            />
          </Section>
          <Section title="GC">
            <Button
              onPress={onPressPlayGC}
              title="Remove and Add Global Contexts"
              color="#228B22"
              accessibilityLabel="testGC"
            />
          </Section>
          <Section title="Removals">
            <Button
              onPress={onPressRemoveSecTracker}
              title="Remove Tracker"
              color="#AA2222"
              accessibilityLabel="testRemove"
            />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  header: {
    padding: 24,
    paddingTop: 48,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.8,
    marginTop: 4,
  },
});

export default App;
