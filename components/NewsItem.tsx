import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ring from './Ring';
import Tts from 'react-native-tts';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const iconSizes = {size: 22, color: COLORS.primary};
const NewsItem = (props) => {

  
  const {title, content, imageUrl, category, source, caption,viewableItems,id } = props ?? {};
console.log({viewableItems})
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === id)
    )

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  console.log({imageUrl});
  const [speakStatus, setSpeakStatus] = useState('');

  const stopText = async () => {
    setSpeakStatus('stopped');
    Tts.stop();
  };

  useEffect(() => {
    Tts.addEventListener('tts-finish', event => {
      if (speakStatus !== 'stopped') {
        setSpeakStatus('stopped');
      }
    });
  }, []);

  const readText = async () => {
    setSpeakStatus('started');

    Tts.stop();
    await Tts.speak(
      'title :' +
        title +
        'Category: ' +
        category +
        'content: ' +
        content +
        'Source:' +
        source,
    );
    // setSpeakStatus('stopped');
  };

  return (
    <Animated.View style={[styles.newsContainer,rStyle]}>
      <Text style={styles.title}>{title}</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.category}>{category}</Text>

        <TouchableOpacity
          onPress={() => {
            // console.lo('hekl');
            if (speakStatus !== 'started') {
              readText();
            } else {
              stopText();
            }
          }}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {speakStatus === 'started' &&
            [...Array(3).keys()].map((_, index) => (
              <Ring key={index} index={index} />
            ))}
          <Icon name={'mic'} {...iconSizes}></Icon>
        </TouchableOpacity>
      </View>
      <Text>{speakStatus}</Text>
      {imageUrl && (
        <Image
          style={{width: '100%', height: 200, marginTop: 12}}
          source={{uri: imageUrl}}></Image>
      )}
      <Text style={styles.content}>{content}</Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 16,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log(source);
            Linking.openURL(source);
          }}>
          <Text style={[styles.category, {textDecorationLine: 'underline'}]}>
            {' '}
            {caption}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 0.35,
          }}>
          {[
            {
              name: 'bookmarks',
              onPress: () => {
                console.log('test');
              },
            },
            {
              name: 'md-share-social-sharp',
              onPress: () => {
                console.log('test');
              },
            },
            {
              name: 'logo-whatsapp',
              onPress: () => {
                console.log('test');
              },
            },
          ].map(({name, onPress}) => {
            return (
              <TouchableOpacity key={name} onPress={onPress}>
                <Icon name={name} {...iconSizes}></Icon>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  newsContainer: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 6,
    shadowColor: COLORS.black,
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

    /* identical to box height, or 150% */

    color: 'rgba(200, 33, 40, 0.8)',
  },
  content: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    marginTop: 12,

    color: '#212329',
  },
  title: {
    color: '#212329',
    fontSize: 20,
    fontWeight: '700',
  },
});
