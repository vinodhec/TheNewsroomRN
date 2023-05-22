import {View, Text, Button, ToastAndroid, ActivityIndicator, BackHandler} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import PressableOpacity from './PressableOpacity';
import {Image} from 'react-native';
import moment from 'moment';
import { getHistoryDetails } from '../firebase/firebaseRealtimeDB';
import { SvgUri } from 'react-native-svg';

import * as LocalAuthentication from 'expo-local-authentication'

const Splash = ({navigation}) => {
  const [dayinhistory, setDayinhistory] = useState({content:'',date:''})
  useEffect(()=>{

   const timerId =  setTimeout(()=>{
      ToastAndroid.show('Navigating to Home page', ToastAndroid.SHORT)
      navigation.replace('Main');

    },5000)
    return ()=>{
      clearTimeout(timerId)
    }
  },[dayinhistory.content])

  useEffect(() => {

    
    //   LocalAuthentication.authenticateAsync().then((data)=>{
        
    // if(!data.success){
    //   BackHandler.exitApp();

    // }
    getHistoryDetails(moment().format('MM-DD')).then((data)=>{
      const text=  data.split("^&!32$5_4'")
      setDayinhistory({content:text?.[0], date:text?.[1]})
    })
  // })

  }, []);

  return (
    <View className="flex-1 p-4 justify-center items-center border-1">
      <View className='flex-1 justify-center items-center'>
      <SvgUri
    width="100%"
    height="100%"
    source={require('./../assets/logo.svg')}
  />
       {!dayinhistory.content &&<ActivityIndicator></ActivityIndicator>}
        {dayinhistory.content && <View>

        
      <Text className="text-sm">{dayinhistory.content} - {dayinhistory.date} </Text>
     
      </View>}
      </View>
      <PressableOpacity
        // className="mt-auto ml-auto"
        className="self-end"
        onPress={() => {
          navigation.replace('Main');
        }}>
        <Text className="text-red-900 font-bold">Go to Home Page</Text>
      </PressableOpacity>
    </View>
  );
};

export default Splash;
