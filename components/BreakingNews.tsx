import {Image, ImageBackground, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PressableOpacity from './PressableOpacity';
import {first} from 'rxjs';
import {useAppSelector} from '../app/hooks';
import {selectGlobalValue} from '../features/global/globalSlice';
import FirestoreService from '../firebase/firestoreService';
import { COLLECTIONS } from '../constants/collections';
import useUpdateGlobal from '../hooks/useUpdateGlobal';
const BreakingNews = ({imageUrl}) => {
  const breaking: any = useAppSelector(selectGlobalValue('breaking'));
  const updateValue = useUpdateGlobal();
 
  const [fallBack, setFallBack] = useState(
    breaking?.imageUrl ??
      'https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png',
  );
  

  if (!breaking) {
    return;
  }

  return (
    <View
      style={{position: 'relative', backgroundColor: '#FAE9EA'}}
      className="py-2">
      <ImageBackground
        style={{
          width: 51,
          height: 67,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1023,
        }}
        source={require('./../assets/breakingnews.png')}>
        <Text className="-rotate-45 text-white" style={{fontSize: 8}}>
          Breaking News
        </Text>
      </ImageBackground>
      <PressableOpacity onPress={async()=>{
        await FirestoreService.deleteDocument(COLLECTIONS.BREAKING,breaking?.id);
        updateValue('breaking',null);
        ToastAndroid.show('Breaking is deleted',ToastAndroid.LONG);
      }}>
        <Icon
          style={{position: 'absolute', top: -6, right: 8}}
          name="close"
          color="#C82128CC"
          size={22} ></Icon>
      </PressableOpacity>
      <View className="flex-row p-2 mb-2 w-10/12">
        <Image
          source={{uri: fallBack}}
          onError={() => {
            setFallBack(
              'https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png',
            );
          }}
          style={{minWidth: 80, minHeight: 80}}></Image>
        <View className=" ml-4 pr-3 items-start justify-start">
          <Text className="text-m text-left  text-black font-bold">
            Breaking news
          </Text>
          <Text numberOfLines={3} className="text-sm">
            {breaking.content}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({});
