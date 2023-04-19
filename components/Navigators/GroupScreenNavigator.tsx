import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTES } from '../../constants'
import GroupScreen from '../GroupScreen'
import GroupDetailsScreen from '../GroupDetailsScreen'
import NewsFeedScreen from '../NewsFeedScreen'
const Stack = createStackNavigator()
const GroupScreenNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name={ROUTES.GROUPSUMMARY} component={GroupScreen}></Stack.Screen>
      <Stack.Screen name={ROUTES.GROUPDETAILS} component={NewsFeedScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default GroupScreenNavigator

const styles = StyleSheet.create({})