import {
  Image,
  ImageBackground,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {COLORS} from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ring from './Ring';
import Tts from 'react-native-tts';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
const iconSizes = {size: 22, color: COLORS.primary};
const NewsItem = props => {
  const {
    title,
    content,
    imageUrl,
    category,
    source,
    caption,
    viewableItems,
    id,
  } = props ?? {};
  const ref = useRef();

  const onCapture = useCallback(uri => {
    console.log('do something with ', uri);
  }, []);

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter(item => item.isViewable)
        .find(viewableItem => viewableItem.item.id === id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  const [speakStatus, setSpeakStatus] = useState('');

  const stopText = async () => {
    setSpeakStatus('stopped');
    Tts.stop();
  };

  const [isWatermark, setIsWatermark] = useState(false);

  const getBase64FromURL = async imageUrl => {
    const resp = await RNFetchBlob.fetch('GET', imageUrl);

    let base64image = resp.data;
    return 'data:image/png;base64,' + base64image;

    // .catch(err => errorHandler(err));
  };

  const shareNews = async (isFromWhatsapp = false) => {
    let image;
    if (imageUrl) {
      image = await getBase64FromURL(imageUrl);
    }

    const shareOptions = {
      title: 'Share via',
      message: content?.slice(0, 100) + '\nThe Newsroom',
      url: image,
      type: 'image/*',
      social: Share.Social.WHATSAPP,
    };

    if (!isFromWhatsapp) {
      Share.shareSingle(shareOptions).then(data => {
        console.log(data);
      });
    } else {
      Share.open(shareOptions);
    }
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
    await Tts.speak(content);
    // setSpeakStatus('stopped');
  };
  const image = {uri: 'https://reactjs.org/logo-og.png'};

  return (
    <Animated.View style={[styles.newsContainer, rStyle]}>
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
              onPress: shareNews.bind(this, true),
            },
            {
              name: 'logo-whatsapp',
              onPress: shareNews.bind(this, false),
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
