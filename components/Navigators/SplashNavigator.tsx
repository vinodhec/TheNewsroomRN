import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import Splash from '../Splash';
const Stack = createStackNavigator();

const SplashNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default SplashNavigator