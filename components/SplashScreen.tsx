import {View, Text, Button, ToastAndroid, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import PressableOpacity from './PressableOpacity';
import {Image} from 'react-native';
import moment from 'moment';
import { getHistoryDetails } from '../firebase/firebaseRealtimeDB';


const Splash = ({navigation}) => {
  const [dayinhistory, setDayinhistory] = useState({content:'',date:''})
  useEffect(()=>{

    setTimeout(()=>{
      ToastAndroid.show('Navigating to Home page', ToastAndroid.SHORT)
      navigation.replace('Main');

    },5000)
  },[dayinhistory.content])

  useEffect(() => {

    getHistoryDetails(moment().format('MM-DD')).then((data)=>{
      const text=  data.split("^&!32$5_4'")
      setDayinhistory({content:text?.[0], date:text?.[1]})
    })
  }, []);

  return (
    <View className="flex-1 p-4 justify-center items-center border-1">
      <View className='flex-1 justify-center items-center'>
      <Image
        source={{
          uri: 'https://hindubabynames.info/downloads/wp-content/themes/hbn_download/download/sports-ipl/tata-ipl-logo.png',
        }}
        style={{width: 300, height: 300}}></Image>
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
