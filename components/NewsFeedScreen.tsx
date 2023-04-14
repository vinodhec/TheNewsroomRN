import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants';
import FirestoreService from '../firebase/firestoreService';
import {ScrollView} from 'react-native-gesture-handler';
import NewsItem from './NewsItem';

const NewsFeedScreen = () => {
  const [newsItems, setNewsItems] = useState([
    {
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/thenewsroom-f5e02.appspot.com/o/uploads%2Fimages%2F1636595831342.jpg?alt=media&token=2989fc9b-0cdb-4ce7-b781-32e9bf1ba914",
        "title": "Subway Submerged.. !!:Tamil Nadu ",
        "links": [],
        "timestamp": {
            "seconds": 1636595854,
            "nanoseconds": 857000000
        },
        "content": "Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.",
        "caption": "",
        "category": "Entertainment ",

        "id": "00nLX4VKNNuBd3qNjZI7"
    },
    {
      "title": "Subway Submerged.. !!:Tamil Nadu ",
      "content": "Duraisamy subway connecting T.Nagar with Ashok Nagar and West Mambalam submerged after heavy overnight rains.",

        "caption": "",
        "category": "Entertainment ",
        "timestamp": {
            "seconds": 1667648433,
            "nanoseconds": 903000000
        }
    }]);
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
    <View
      style={{
        flex: 1,
      
        backgroundColor: COLORS.bgColor,
      
      }}>
      <ScrollView contentContainerStyle={{flex:1, padding:16}} >
        {newsItems?.map((news: any) => {
          return <NewsItem {...news}></NewsItem>
        })}
      </ScrollView>
    </View>
  );
};

export default NewsFeedScreen;
