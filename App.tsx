import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './components/Splash';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';
import SplashNavigator from './components/Navigators/SplashNavigator';


const App = () => {
  return (
    <NavigationContainer>
    <SplashNavigator></SplashNavigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexGrow: 1,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
