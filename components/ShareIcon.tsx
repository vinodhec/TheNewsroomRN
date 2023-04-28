import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
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
import useUpdateGlobal from '../hooks/useUpdateGlobal';
const iconSizes = {size: 22, color: COLORS.primary};
const ShareIcon = ({isBookmarked, addToBookMark, news}) => {
  const {id, content,title, imageUrl} = news ||{};
  //
  const updateValue= useUpdateGlobal() 
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const deleteNews = () => {
    
    FirestoreService.deleteDocument(COLLECTIONS.NEWS, id);
    ToastAndroid.show(`${title} is deleted`, ToastAndroid.LONG)
    updateValue('newsDeleted',id)
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
      
        return [
          ...iconFactory,
          {name: 'trash', onPress: deleteNews},
          {
            name: 'md-create',
            onPress: () => {
              
              dispatch(update({valueType:'editNews',value:omit(news,['timestamp'])} as any))
              navigation.navigate(ROUTES.ADD);
            },
          },
        ];
      
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
