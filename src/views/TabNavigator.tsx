import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { theme } from 'native-base';
import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RouteView } from './RouteView';
import { TimetableView } from './TimetableView';

const Tab = createBottomTabNavigator();

type RenderIconArgs = {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<ParamListBase, string>;
};

const renderIcon = ({
  focused,
  color,
  size,
  route,
}: RenderIconArgs): ReactElement => {
  let iconName: string;

  switch (route.name) {
    case 'Route':
      iconName = focused ? 'navigation-variant' : 'navigation-variant-outline';
      break;
    case 'Timetable':
      iconName = focused ? 'file-table-box' : 'file-table-box-outline';
      break;
    default:
      iconName = '';
      break;
  }

  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
};

const renderButton = (props: BottomTabBarButtonProps): ReactElement => (
  <TouchableOpacity {...props} />
);

export function TabNavigator(): ReactElement {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarButton: renderButton,
        tabBarIcon: ({ focused, color, size }) =>
          renderIcon({ focused, color, size, route }),
        tabBarActiveTintColor: theme.colors.orange['500'],
      })}>
      <Tab.Screen name="Route" component={RouteView} />
      <Tab.Screen name="Timetable" component={TimetableView} />
    </Tab.Navigator>
  );
}
