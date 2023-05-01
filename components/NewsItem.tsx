import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ring from './Ring';
import Tts from 'react-native-tts';

import {toggleBookmarks} from '../features/global/globalSlice';


import PressableOpacity from './PressableOpacity';
import {StyledView} from './StyledComponents';
import ShareIcon from './ShareIcon';
import moment from 'moment';
import Video from 'react-native-video';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectGlobalValue, update } from '../features/global/globalSlice';
import { usePreventScreenCapture } from 'expo-screen-capture';
const iconSizes = {size: 22, color: COLORS.primary};
const NewsItem = props => {
  const {
    title,
    content,
    imageUrl,
    category,
    isBookmarked,
    
    source,
    caption,
    
    speechStatus,
    id,
    isVideo,
    timestamp

  } = props ?? {};
  const ref = useRef();
  // usePreventScreenCapture();
  const dispatch = useAppDispatch();

  const [speakStatus, setSpeakStatus] = useState('');
  
  
  
  useEffect(() => {
    if (
      ['cancelled', 'stopped'].includes(speechStatus) &&
      speakStatus === 'started'
    ) {
      setSpeakStatus('stopped');
    }
  }, [speechStatus]);
  const stopText = async () => {
    setSpeakStatus('stopped');
    Tts.stop();
  };

  

  const readText = async () => {
    stopText();

    await Tts.speak(content);
    setTimeout(() => {
      setSpeakStatus('started');
    }, 500);

    // setSpeakStatus('stopped');
  };
  // backgroundColor: COLORS.white,
  // marginBottom: 16,
  // padding: 16,
  // borderRadius: 6,
  // shadowColor: COLORS.black,
  // shadowOffset: {
  //   width: 0,
  //   height: 10,
  // },
  // shadowOpacity: 0.3,
  // shadowRadius: 20,

  return (
    <StyledView
      className="mb-4 p-2 py-4 shadow-black bg-white dark:bg-black rounded-md"
      style={styles.newsContainer}>
      <Text className="text-black font-black mb-0 dark:text-white">{title}</Text>

      <View
      className='mt-0'
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text className="text-red-500 text-xs">{category} | {moment(timestamp.toDate()).calendar(
         {
          sameDay: 'hh:mm A',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'DD/MM/YYYY'
      })}</Text>

        <PressableOpacity
          onPress={() => {
            // console.lo('hekl');
            if (speakStatus !== 'started') {
              readText();
            } else {
              stopText();
            }
          }}
          style={{
            width: 20,
            height: 20,
          }}>
          {speakStatus === 'started' &&
            [...Array(3).keys()].map((_, index) => (
              <Ring key={index} index={index} />
            ))}
          <MaterialIcon name={'text-to-speech'} {...iconSizes}></MaterialIcon>
        </PressableOpacity>
      </View>

      {imageUrl && !isVideo && (
        <Image
          style={{width: '100%', height: 200, marginTop: 12}}
          source={{uri: imageUrl}}></Image>
      )}
       {/* {imageUrl && isVideo && (<Video paused controls className="items-center mx-auto border-1"  */}
       {/* style={styles.backgroundVideo} */}
      {/* source={{uri:imageUrl}} */}
      {/* ></Video>)}  */}
      <Text className='text-black dark:text-white' style={styles.content}>{content}</Text>
      <StyledView
       className='mt-4 flex-row'
        style={{
          flexDirection: 'row',
          marginTop: 16,
          justifyContent: 'space-between',
        }}>
        <PressableOpacity
          onPress={() => {
            
            Linking.openURL(source);
          }}>
          <Text style={[styles.category, {textDecorationLine: 'underline'}]}>
            {' '}
            {caption}
          </Text>
        </PressableOpacity>
        <ShareIcon isBookmarked={isBookmarked} addToBookMark={()=>{
          console.log('toggle')
          dispatch(toggleBookmarks({id}))
          }} news={props}></ShareIcon>
      </StyledView>
    </StyledView>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  backgroundVideo: {
    height:200,
    width:200,
    
  },
  newsContainer: {
    
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  category: {
    fontWeight: '400',
    fontSize: 11,
    color: 'rgba(200, 33, 40, 0.8)',
  },
  content: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    marginTop: 12,

    
  },
  title: {
    color: '#212329',
    fontSize: 20,
    fontWeight: '700',
  },
});
