import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PressableOpacity from './PressableOpacity';
import {omit} from 'lodash';
import Share from 'react-native-share';
import {COLORS, ROUTES} from '../constants';
import {getBase64FromURL} from '../utils/utilsService';
import FirestoreService from '../firebase/firestoreService';
import {COLLECTIONS} from '../constants/collections';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../app/hooks';
import {update} from '../features/global/globalSlice';
const iconSizes = {size: 22, color: COLORS.primary};
const ShareIcon = ({isBookmarked, addToBookMark, news}) => {
  const {id, content, imageUrl} = news ||{};
  // console.log({isBookmarked},news.title)
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const deleteNews = id => {
    console.log({id});
    FirestoreService.deleteDocument(COLLECTIONS.NEWS, id);
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
  const iconFactory: any = [
    {
      name: isBookmarked ? 'bookmarks' : 'bookmarks-outline',
      onPress: addToBookMark?.bind(this, id),
    },
    {
      name: 'md-share-social-sharp',
      onPress: shareNews.bind(this, true),
    },
    {
      name: 'logo-whatsapp',
      onPress: shareNews.bind(this, false),
    },
  ];
  const [iconList, setIconList] = useState(iconFactory);

  useEffect(() => {
    setIconList(() => {
      if (!iconList.some(({name}) => name == 'trash') && false) {
        return [
          ...iconFactory,
          {name: 'trash', onPress: deleteNews},
          {
            name: 'md-create',
            onPress: () => {
              console.log({news});
              // dispatch(update({valueType:'editNews',value:omit(news,['timestamp'])} as any))
              navigation.navigate(ROUTES.ADD);
            },
          },
        ];
      } else {
        return [...iconFactory];
      }
    });
  }, [isBookmarked]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: iconList.length > 3 ? 0.5 : 0.35,
      }}>
      {iconList
        .filter(item => item.onPress)
        .map(({name, onPress}) => {
          return (
            <PressableOpacity key={name} onPress={onPress}>
              <Icon name={name} {...iconSizes}></Icon>
            </PressableOpacity>
          );
        })}
    </View>
  );
};

export default ShareIcon;

const styles = StyleSheet.create({});
