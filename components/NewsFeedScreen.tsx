import {View, Text, FlatList, Animated, ViewToken} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS, ROUTES} from '../constants';
import FirestoreService from '../firebase/firestoreService';
import { dbRef, getHistoryDetails } from '../firebase/firebaseRealtimeDB';
import NewsItem from './NewsItem';
import {useSharedValue} from 'react-native-reanimated';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/Ionicons';
import LazyLoad from './LazyLoad';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectGlobalValue, update} from '../features/global/globalSlice';
import {StyledView} from './StyledComponents';
import PressableOpacity from './PressableOpacity';
import { COLLECTIONS } from '../constants/collections';
import moment from 'moment';

const NewsFeedScreen = ({route,navigation}) => {
  
  const temp = route.params?.category;
  const groups = route.params?.groups;
  const id = route.params?.id;
  const bookmarks: any = useAppSelector(selectGlobalValue('bookmarks')) ?? [];
console.log({temp,groups,id},route.params)
  const [category, setCategory] = useState(temp === 'All' ? '' : temp);
  const dispatch = useAppDispatch();
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


  const addToBookMark = id => {
    console.log({bookmarks, id},'feed');
    let value;
    if (bookmarks.includes(id)) {
      value = bookmarks.filter(bid => bid != id);
    } else {
      value = [...bookmarks, id];
    }
    console.log({value})
    dispatch(
      update({
        valueType: 'bookmarks',

        value,
      } as any),
    );
  };

  useEffect(() => {

    getHistoryDetails(moment().format('MM-DD'))
  }, []);
  return (
    <StyledView className="dark:bg-black">
    {!(groups?.id || id)  &&  <PressableOpacity
      onPress={()=>{
        navigation.replace(ROUTES.ADD)
      }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          position: 'absolute',
          bottom: 80,
          right: 10,
          height: 80,
          zIndex: 1028,
        }}>
        <Icon name="ios-add-circle-sharp" color={COLORS.primary} size={80} />
      </PressableOpacity>}
      <LazyLoad
        collectionName={COLLECTIONS.NEWS}
       customIds ={bookmarks}
       isCustom={route.params.isCustom}
        // options={{customIds:bookmarks, isCustom:true}}
        options={{limit: 5, query: [['category', '==', category],['groups', '==', groups?.id],['id', '==', id]]}}
        updateItems={() => {}}
        content={({item}) => {
          const isBookmarked=bookmarks?.includes(item?.id)
          console.log({isBookmarked},item.title)
          return (
            <NewsItem
              {...item}
              key={item?.id}
              addToBookMark={addToBookMark}
              speechStatus={speechStatus}
              isBookmarked={isBookmarked}
              ></NewsItem>
          );
        }}></LazyLoad>
    </StyledView>
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
