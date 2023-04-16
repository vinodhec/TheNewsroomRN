import {View, Text, FlatList, Animated, ViewToken} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants';
import FirestoreService from '../firebase/firestoreService';
import {ScrollView} from 'react-native-gesture-handler';
import NewsItem from './NewsItem';
import {useSharedValue} from 'react-native-reanimated';
import Tts from 'react-native-tts';
import LazyLoad from './LazyLoad';

const NewsFeedScreen = () => {
  const [newsItems, setNewsItems] = useState([
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/thenewsroom-f5e02.appspot.com/o/uploads%2Fimages%2F1636595831342.jpg?alt=media&token=2989fc9b-0cdb-4ce7-b781-32e9bf1ba914',
      title: 'Subway Submerged.. !!:Tamil Nadu ',
      links: [],
      timestamp: {
        seconds: 1636595854,
        nanoseconds: 857000000,
      },
      source: 'https://www.maadiveedu.com',
      caption: 'BBC',
      content:
        'Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.',

      category: 'Entertainment ',

      id: '00nLX4Vd3qNjZI7',
    },
    {
      title: 'Subway Submerged.. !!:Tamil Nadu ',
      content:
        'Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.',
      source: 'https://www.maadiveedu.com',
      caption: 'BBC',

      category: 'Entertainment ',
      timestamp: {
        seconds: 1667648433,
        nanoseconds: 903000000,
      },
      id: '00nLKNNuBd3qNjZI9',
    },
    {
      title: 'Subway Submerged.. !!:Tamil Nadu ',
      content:
        'Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.',
      source: 'https://www.maadiveedu.com',
      caption: 'BBC',

      category: 'Entertainment ',
      timestamp: {
        seconds: 1667648433,
        nanoseconds: 903000000,
      },
      id: '00nLX4KNNuBd3qNjZI9',
    },
    {
      title: 'Subway Submerged.. !!:Tamil Nadu ',
      content:
        'Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.',
      source: 'https://www.maadiveedu.com',
      caption: 'BBC',

      category: 'Entertainment ',
      timestamp: {
        seconds: 1667648433,
        nanoseconds: 903000000,
      },
      id: '00nLX4VKNNBd3qNjZI9',
    },
    {
      title: 'Subway Submerged.. !!:Tamil Nadu ',
      content:
        'Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.',
      source: 'https://www.maadiveedu.com',
      caption: 'BBC',

      category: 'Entertainment ',
      timestamp: {
        seconds: 1667648433,
        nanoseconds: 903000000,
      },
      id: '00nLX4VKNNuBd3qjZI9',
    },
    {
      title: 'Subway Submerged.. !!:Tamil Nadu ',
      content:
        'Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.',
      source: 'https://www.maadiveedu.com',
      caption: 'BBC',

      category: 'Entertainment ',
      timestamp: {
        seconds: 1667648433,
        nanoseconds: 903000000,
      },
      id: '00nLX4VKNNuBd3qNjZ',
    },
  ]);
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const onViewCallBack = React.useCallback(viewableItems => {
    console.log(viewableItems);
    // Use viewable items in state or as intended
  }, []); // any dependencies that require the function to be "redeclared"

  const [speechStatus, setSpeechStatus] = useState('stppped');
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

  const getData = () => {};

  useEffect(() => {}, []);
  return (
    <LazyLoad
      collectionName={'news'}
      options={{limit:5}}
      dontChangeOnOptions={false}
      updateItems={()=>{}}
      content={({item}) => {
        return (
          <NewsItem
            {...item}
            key={item?.id}
            speechStatus={speechStatus}></NewsItem>
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
