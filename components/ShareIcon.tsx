import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import PressableOpacity from './PressableOpacity';

import Share from 'react-native-share';
import { COLORS } from '../constants';
import { getBase64FromURL } from '../utils/utilsService';
const iconSizes = {size: 22, color: COLORS.primary};
const ShareIcon = ({isBookmarked,addToBookMark,id,content,imageUrl}) => {


    
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
  return (
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 0.35,
    }}>
    {[
      {
        name: isBookmarked ?  'bookmarks':'ios-bookmarks-outline',
        onPress: addToBookMark?.bind(this,id),
      },
      {
        name: 'md-share-social-sharp',
        onPress: shareNews.bind(this, true),
      },
      {
        name: 'logo-whatsapp',
        onPress: shareNews.bind(this, false),
      },
    ].filter((item)=>item.onPress).map(({name, onPress}) => {
      return (
        <PressableOpacity key={name} onPress={onPress}>
          <Icon name={name} {...iconSizes}></Icon>
        </PressableOpacity>
      );
    })}
  </View>
  )
}

export default ShareIcon

const styles = StyleSheet.create({})


