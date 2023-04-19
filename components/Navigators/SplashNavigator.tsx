import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../HomeScreen';
import {omit}from 'lodash';
import Splash from '../SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { useAppDispatch } from '../../app/hooks';
import { COLLECTIONS } from '../../constants/collections';
import { update } from '../../features/global/globalSlice';
import FirestoreService from '../../firebase/firestoreService';
const Stack = createStackNavigator();

const SplashNavigator = () => {
  const dispatch = useAppDispatch();
  
  
  useEffect(()=>{
    FirestoreService.getDocuments(COLLECTIONS.GROUPS,{}).then((data)=>{
      console.log(data);
      dispatch(
        update({
          valueType: 'groups',
  
          value:data.map((dd)=>{return omit(dd,'timestamp')}),
        } as any),
      );
    })
   
    
  })
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    
      <Stack.Screen name="Main" component={BottomTabNavigator} ></Stack.Screen>
      <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default SplashNavigator