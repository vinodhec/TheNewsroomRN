import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../HomeScreen';
import Splash from '../SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
const Stack = createStackNavigator();

const SplashNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    
      <Stack.Screen name="Main" component={BottomTabNavigator} ></Stack.Screen>
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default SplashNavigator