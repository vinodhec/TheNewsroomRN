import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewsFeedScreen from '../NewsFeedScreen';
import CustomTopTabBar from '../CustomTopTabBar';
import {COLORS} from '../../constants';
import { useColorScheme } from 'nativewind';
import { useAppSelector } from '../../app/hooks';
import { selectGlobalValue } from '../../features/global/globalSlice';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const categories: any = useAppSelector(selectGlobalValue('categories')) ?? [];
console.log(categories)
  return (
    <Tab.Navigator
      // tabBar={(props)=><CustomTopTabBar  {...props}></CustomTopTabBar>}
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => <ActivityIndicator></ActivityIndicator>,
        tabBarGap: 0,
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          height: 0,
        },
        tabBarContentContainerStyle:{
          backgroundColor: colorScheme !=='dark'? COLORS.white : '#21232980', 
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
        tabBarInactiveTintColor: colorScheme ==='dark'? COLORS.white : '#21232980',

        // tabBarIndicatorStyle​:{height:10}

        // tabBarItemStyle: {width: "auto", minWidth: "200"},
        // tabBarLabelStyle: {fontSize: 12},

        // tabBarStyle: {backgroundColor: 'powderblue'},
      }}>
      {categories.map((value, index) => {
        return (
          <Tab.Screen
            initialParams={{category: value}}
            key={index}
            name={value}
            component={NewsFeedScreen}
          />
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
