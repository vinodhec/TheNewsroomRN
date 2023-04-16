import {View, Text, FlatList, Animated, ViewToken} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants';
import FirestoreService from '../firebase/firestoreService';
import {ScrollView} from 'react-native-gesture-handler';
import NewsItem from './NewsItem';
import {useSharedValue} from 'react-native-reanimated';
import Tts from 'react-native-tts';
import LazyLoad from './LazyLoad';

const NewsFeedScreen = ({route}) => {
  
  const [category, setCategory] = useState('')

  React.useEffect(() => {
    const temp =route.params?.category ;
    if (temp) {
     setCategory(temp === 'All' ? '':temp );
    }
  }, [route.params?.category]);

  const [speechStatus, setSpeechStatus] = useState('stopped');
  useEffect(() => {
    Tts.addEventListener('tts-start', event => {
      setSpeechStatus('started');
    });
    Tts.addEventListener('tts-finish', event => {
      // if (speakStatus && speakStatus !== 'stopped') {
      //   setSpeakStatus('stopped');
      // }
      setSpeechStatus('stopped');
    });
    Tts.addEventListener('tts-cancel', event => {
      // if (speakStatus &&  speakStatus !== 'cancelled') {
      //   setSpeakStatus('cancelled');
      // }
      setSpeechStatus('cancelled');
    });
  }, []);

  

  useEffect(() => {}, []);
  return (
    <LazyLoad
      collectionName={'news'}
      options={{limit:5,query:[['category',"==",category]]}}
      dontChangeOnOptions={false}
      updateItems={()=>{}}
      content={({item}) => {
        return (
          <NewsItem
            {...item}
            key={item?.id}
            speechStatus={speechStatus}
            ></NewsItem>
        );
      }}></LazyLoad>
    // <FlatList
    //   data={newsItems}
    //   keyExtractor={item => item?.id}
    //   // onViewableItemsChanged={({ viewableItems: vItems }) => {
    //   //   viewableItems.value = vItems;
    //   // }}
    //   onEndReached={getData}
    //   onEndReachedThreshold={0.5}
    //   renderItem={({item}) => {
    //     return <NewsItem {...item} key={item?.id} speechStatus={speechStatus}></NewsItem>;
    //   }}
    //   contentContainerStyle={{padding: 16}}></FlatList>
  );
};

export default NewsFeedScreen;
function setCategory(category: any) {
  throw new Error('Function not implemented.');
}

