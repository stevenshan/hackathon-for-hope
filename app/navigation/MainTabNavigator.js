import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CameraStack from '../screens/CameraScreen';
//import EncourageScreen from '../screens/EncourageScreen';
import PrescriptionScreen from '../screens/PrescriptionScreen';
import InstructionScreen from '../screens/InstructionScreen';
import CalendarScreen from '../screens/CalendarScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
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
  tabBarLabel: 'Prescription',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const InstructionStack = createStackNavigator({
  Instruction: InstructionScreen,
});

InstructionStack.navigationOptions = {
  tabBarLabel: 'Instructions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  CameraStack,
  PrescriptionStack,
  InstructionStack,
  CalendarStack,
});
