import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Ring from './Ring';
import Tts from 'react-native-tts';


import PressableOpacity from './PressableOpacity';
import {StyledView} from './StyledComponents';
import ShareIcon from './ShareIcon';

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
    addToBookMark,
    speechStatus,
    id,
  } = props ?? {};
  const ref = useRef();

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
        <Text className="text-red-500 text-xs">{category}</Text>

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
          <Icon name={'mic'} {...iconSizes}></Icon>
        </PressableOpacity>
      </View>

      {imageUrl && (
        <Image
          style={{width: '100%', height: 200, marginTop: 12}}
          source={{uri: imageUrl}}></Image>
      )}
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
            console.log(source);
            Linking.openURL(source);
          }}>
          <Text style={[styles.category, {textDecorationLine: 'underline'}]}>
            {' '}
            {caption}
          </Text>
        </PressableOpacity>
        <ShareIcon isBookmarked={isBookmarked} addToBookMark={addToBookMark} id={id} content={content} imageUrl={imageUrl}></ShareIcon>
      </StyledView>
    </StyledView>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
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
