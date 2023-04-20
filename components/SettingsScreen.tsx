import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomSwitch from 'react-native-custom-switch';

const SettingsScreen = () => {
  return (
    <View>
        <CustomSwitch />
      <Text>SettingsScreen</Text>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})