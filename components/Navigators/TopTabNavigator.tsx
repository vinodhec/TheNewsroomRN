import {View, Text} from 'react-native';
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewsFeedScreen from '../NewsFeedScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarItemStyle: {width: 120},
        tabBarStyle: {backgroundColor: 'powderblue'},
      }}>
      {[
        'All',
        'India',
        'TamilNadu',
        'Sports',
        'Entertainment',
        'Finance',
        'World',
      ].map((value, index) => {
        return (
          <Tab.Screen key={index} name={value} component={NewsFeedScreen} />
        );
      })}
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
