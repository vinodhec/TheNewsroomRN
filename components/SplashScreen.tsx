import {View, Text, Button, ToastAndroid} from 'react-native';
import React, { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import PressableOpacity from './PressableOpacity';
import {Image} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(()=>{

    setTimeout(()=>{
      ToastAndroid.show('Navigating to Home page', ToastAndroid.SHORT)
      navigation.replace('Main');

    },5000)
  })
  return (
    <View className="flex-1 p-4 justify-center items-center border-1">
      <View className='flex-1 justify-center items-center'>
      <Image
        source={{
          uri: 'https://hindubabynames.info/downloads/wp-content/themes/hbn_download/download/sports-ipl/tata-ipl-logo.png',
        }}
        style={{width: 300, height: 300}}></Image>
      <Text className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
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
