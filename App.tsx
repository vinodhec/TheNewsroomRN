import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './components/Splash';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
console.log(Stack);
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
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
