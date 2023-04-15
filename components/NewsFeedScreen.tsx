import {View, Text, FlatList, Animated, ViewToken} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants';
import FirestoreService from '../firebase/firestoreService';
import {ScrollView} from 'react-native-gesture-handler';
import NewsItem from './NewsItem';
import { useSharedValue } from 'react-native-reanimated';

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

  // useEffect(() => {
  //   FirestoreService.getDocuments('news', {
  //     limit: 3,
  //     isCollectionGroup: false,
  //   }).then(data => {
  //     setNewsItems(data);
  //     console.log(JSON.stringify(data));
  //   });
  // }, []);
  return (
    <FlatList
      data={newsItems}
      keyExtractor={item => item?.id}
      onViewableItemsChanged={({ viewableItems: vItems }) => {
        viewableItems.value = vItems;
      }}
      renderItem={({item}) => {
        const inputRange = [-1, 0];
        return <NewsItem {...item} key={item?.id}  viewableItems={viewableItems} ></NewsItem>;
      }}
      contentContainerStyle={{ padding: 16}}></FlatList>
  );
};

export default NewsFeedScreen;
