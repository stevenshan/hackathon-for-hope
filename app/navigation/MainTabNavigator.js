import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CameraStack from '../screens/CameraScreen';
import PrescriptionScreen from '../screens/PrescriptionScreen';
import CalendarScreen from '../screens/CalendarScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-camera'
    />
  ),
};
HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-calendar'
    />
  ),
};

const PrescriptionStack = createStackNavigator({
    Prescription: PrescriptionScreen,
});

PrescriptionStack.navigationOptions = {
  tabBarLabel: 'Prescriptions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name= 'ios-clipboard' 
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CameraStack,
  PrescriptionStack,
  CalendarStack,
});
