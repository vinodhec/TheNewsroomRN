import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../constants';
import NewsFeedScreen from '../NewsFeedScreen';
import AddNews from '../AddNews';
import TopTabNavigator from './TopTabNavigator';
const Stack = createStackNavigator();
const HomeScreenNavigator = ({route}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
      <Stack.Screen
        name={ROUTES.NEWSFEED}
        component={TopTabNavigator}></Stack.Screen>
      <Stack.Screen name={ROUTES.ADD} component={AddNews}></Stack.Screen>
      
    </Stack.Navigator>
  );
};

export default HomeScreenNavigator;
