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

const iconSizes = {size: 22, color: COLORS.primary};
const NewsItem = props => {
  const {title, content, imageUrl, category, source, caption} = props ?? {};
  console.log({imageUrl});
  const [speakStatus, setSpeakStatus] = useState('');

  const readText = async () => {
    Tts.stop();
    Tts.speak(
      'title :' +
        title +
        'Category: ' +
        category +
        'content: ' +
        content +
        'Source:' +
        source,
    );
  };
  useEffect(() => {
    Tts.addEventListener('tts-start', event => {
      Tts.speak('Starting to read');
      setSpeakStatus('started');
    });
    Tts.addEventListener('tts-finish', event => {
      setSpeakStatus('read completed');
      setSpeakStatus('finished');
    });
    Tts.addEventListener('tts-cancel', event => {
      Tts.speak('cancelled');
      setSpeakStatus('Cancelled reading');
    });
  }, []);
  return (
    <View style={styles.newsContainer}>
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
            console.log('hekl');
            Tts.speak('Hello, world!');
          }}
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          { speakStatus === 'started' && [...Array(3).keys()].map((_, index) => (
            <Ring key={index} index={index} />
          )) }
          <Icon
            onPress={() => {
              console.log('hekl');
              Tts.speak('Hello, world!');
            }}
            name="mic"
            {...iconSizes}></Icon>
        </TouchableOpacity>
      </View>

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
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  newsContainer: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 6,
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
