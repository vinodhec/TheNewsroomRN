import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewsFeedScreen from '../NewsFeedScreen';
import CustomTopTabBar from '../CustomTopTabBar';
import {COLORS} from '../../constants';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={(props)=><CustomTopTabBar  {...props}></CustomTopTabBar>}
      screenOptions={{
        tabBarGap: 0,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          height: 0,
        },
        tabBarStyle: {
          backgroundColor: COLORS.bgColor,
          padding: 0,
        },
        tabBarItemStyle: {
          width: 'auto',
          padding: 8,
        },
        tabBarLabelStyle: {textTransform: 'capitalize'},
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#21232980',

        // tabBarIndicatorStyle​:{height:10}

        // tabBarItemStyle: {width: "auto", minWidth: "200"},
        // tabBarLabelStyle: {fontSize: 12},

        // tabBarStyle: {backgroundColor: 'powderblue'},
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

const styles = StyleSheet.create({
  topBarIndicator: {
    color: COLORS.primary,
  },
});
export default TopTabNavigator;
