import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { TabNavigator } from './TabNavigator';
import { SettingsView } from './SettingsView';
import { StackNavigatorParamList } from './types';
import { RouteMapView } from './RouteMapView';

const Stack = createNativeStackNavigator<StackNavigatorParamList>();

export function StackNavigator(): ReactElement {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Root" component={TabNavigator} />
      <Stack.Screen name="Settings" component={SettingsView} />
      <Stack.Screen
        name="RouteMapView"
        component={RouteMapView}
        options={{ freezeOnBlur: false }}
      />
    </Stack.Navigator>
  );
}
