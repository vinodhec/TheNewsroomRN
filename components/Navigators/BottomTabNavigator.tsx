import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

import HighlightScreen from '../HighlightScreen';
import MenuScreen from '../MenuScreen';
import TopTabNavigator from './TopTabNavigator';
import {COLORS, ROUTES} from '../../constants';
import colors from '../../constants/colors';

import CustomTabBarButton from '../CustomTabBarButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      // tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => {
        return {
          headerTitle: 'The Newsroom',
          headerStyle: {
            backgroundColor: '#C82128',
          },
          headerRight: () => (
            <View style={{flexDirection: 'row',justifyContent:'space-between', width:64,marginRight:24}}>
              <TouchableOpacity>
                <Icon name={'search'} size={22} color={COLORS.white} />
              </TouchableOpacity>
              <Pressable>
                <Icon name={'ios-moon-sharp'} size={22} color={COLORS.white} />
              </Pressable>
            </View>
          ),
          headerTintColor: COLORS.white,

          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarInactiveTintColor: COLORS.white,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({color, size, focused}) => {
            let iconName;

            if (route.name === ROUTES.HOME) {
              iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            } else if (route.name === ROUTES.HIGHLIGHT) {
              iconName = focused
                ? 'md-notifications-sharp'
                : 'md-notifications-outline';
            } else if (route.name === ROUTES.GROUP) {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === ROUTES.MENU) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Icon name={iconName} size={22} color={color} />;
          },
        };
      }}>
      <Tab.Screen
        name={ROUTES.HOME}
        component={TopTabNavigator}
        options={{
          tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.HIGHLIGHT}
        component={HighlightScreen}
        options={{
          tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.GROUP}
        component={HighlightScreen}
        options={{
          tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
        }}
      />
      <Tab.Screen
        name={ROUTES.MENU}
        component={MenuScreen}
        options={{
          tabBarButton: props => <CustomTabBarButton route="home" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    // backgroundColor: COLORS.bottomTabBG,
    backgroundColor: COLORS.bottomTabBG,
    bottom: 20,
    right: 20,
    left: 20,
    height: 50,
    borderRadius: 100,
  },
  tabBarItemActive: {
    backgroundColor: colors.gradientForm,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
});

export default BottomTabNavigator;
