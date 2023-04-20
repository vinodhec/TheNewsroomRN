import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../../constants'
import BookmarkScreen from '../BookmarkScreen'
import AboutScreen from '../AboutScreen'
import SettingsScreen from '../SettingsScreen'
import ThemesScreen from '../ThemesScreen'
import ContactScreen from '../ContactScreen'
import DayHistoryScreen from '../DayHistoryScreen'
import FeedbackScreen from '../FeedbackScreen'
import PrivacyScreen from '../PrivacyScreen'

import MenuScreen from '../MenuScreen'
const Stack = createStackNavigator()
const MenuScreenNavigator = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name={ROUTES.MENULIST} component={MenuScreen}></Stack.Screen>
<Stack.Screen name={ROUTES.BOOKMARKS} component={BookmarkScreen}></Stack.Screen>
<Stack.Screen name={ROUTES.ABOUTUS} component={AboutScreen}></Stack.Screen>
<Stack.Screen name={ROUTES.THEMES} component={ThemesScreen}></Stack.Screen>
<Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen}></Stack.Screen>

<Stack.Screen name={ROUTES.CONTACT} component={ContactScreen}></Stack.Screen>

<Stack.Screen name={ROUTES.FEEDBACK} component={FeedbackScreen}></Stack.Screen>
<Stack.Screen name={ROUTES.PRIVACY} component={PrivacyScreen}></Stack.Screen>
<Stack.Screen name={ROUTES.ONTHISDAY} component={DayHistoryScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default MenuScreenNavigator

const styles = StyleSheet.create({})