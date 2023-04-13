import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation();
    
  return (
    <View>
      <Text>Splash</Text>
      <Button title="Go to Home" onPress={()=>{
        navigation.navigate('Main')
      }}></Button>
    </View>
  )
}

export default Splash