import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import { ROUTES } from '../../utils/Constants';
import HighlightScreen from '../HighlightScreen';
import MenuScreen from '../MenuScreen';
import TopTabNavigator from './TopTabNavigator';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen name={ROUTES.HOME} component={TopTabNavigator} />
    <Tab.Screen name={ROUTES.HIGHLIGHT} component={HighlightScreen} />
    <Tab.Screen name={ROUTES.GROUP} component={HighlightScreen} />
    <Tab.Screen name={ROUTES.MENU} component={MenuScreen} />

  </Tab.Navigator>

  )
}

export default BottomTabNavigator