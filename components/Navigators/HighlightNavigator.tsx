import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../../constants'
import NewsFeedScreen from '../NewsFeedScreen'
import HighlightScreen from '../HighlightScreen'

const Stack = createStackNavigator()
const HighlightNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={ROUTES.HIGHLIGHT_LIST} component={HighlightScreen}></Stack.Screen>
      <Stack.Screen name={ROUTES.NEWSFEED_ID} component={NewsFeedScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default HighlightNavigator

const styles = StyleSheet.create({})