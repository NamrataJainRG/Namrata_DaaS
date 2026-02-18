import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import OverviewScreen from './screens/OverviewScreen';
import RateTrendsScreen from './screens/RateTrendsScreen';
import DemandForecastScreen from './screens/DemandForecastScreen';
import ParityMonitorScreen from './screens/ParityMonitorScreen';
import OTARankingsScreen from './screens/OTARankingsScreen';
import EventsCalendarScreen from './screens/EventsCalendarScreen';
import NavigatorDrawer from './components/NavigatorDrawer';
import ErrorBoundary from './components/ErrorBoundary';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Drawer.Navigator
            drawerContent={(props) => <NavigatorDrawer {...props} />}
            screenOptions={{
              headerShown: false,
              drawerType: Platform.OS === 'web' ? 'front' : 'slide',
              drawerStyle: {
                width: Platform.OS === 'web' ? '85%' : '85%',
              },
              overlayColor: 'rgba(0, 0, 0, 0.5)',
              swipeEnabled: true,
              swipeEdgeWidth: 50,
            }}
          >
            <Drawer.Screen name="Overview" component={OverviewScreen} />
            <Drawer.Screen name="RateTrends" component={RateTrendsScreen} />
            <Drawer.Screen name="DemandForecast" component={DemandForecastScreen} />
            <Drawer.Screen name="ParityMonitor" component={ParityMonitorScreen} />
            <Drawer.Screen name="OTARankings" component={OTARankingsScreen} />
            <Drawer.Screen name="EventsCalendar" component={EventsCalendarScreen} />
            <Drawer.Screen name="Reports" component={OverviewScreen} />
            <Drawer.Screen name="HelpSupport" component={OverviewScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
