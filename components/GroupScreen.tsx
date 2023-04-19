import {View, Text, Image} from 'react-native';
import React, { useState } from 'react';
import {COLLECTIONS} from '../constants/collections';
import LazyLoad from './LazyLoad';
import {StyledView} from './StyledComponents';
import PressableOpacity from './PressableOpacity';
import {ROUTES} from '../constants';

const RenderOptions = ({item,navigation}) => {
  const [fallBack, setFallBack] = useState(item.imageUrl??'https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png');
  return (
    <PressableOpacity
      onPress={() => {
        navigation.navigate(ROUTES.GROUPDETAILS, {groups:item});
      }}>
      <View className="flex-row p-4 mb-2 bg-white">
        <Image source={{uri: fallBack}}        onError={ ()=>{
          setFallBack('https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png')
        }}
style={{minWidth:80, minHeight:80}}></Image>
        <View className='grow-1 ml-4'>
          <Text className='text-l font-bold'>{item?.title}</Text>
          <Text className='text-xs opacity-75'>{item?.label}</Text>
          <Text className='text-m'>{item?.description}</Text>
        </View>
      </View>
    </PressableOpacity>
  );
}


const GroupScreen = ({navigation}) => {
  return (
    <StyledView className="dark:bg-black">
      <LazyLoad
        collectionName={COLLECTIONS.GROUPS}
        options={{limit: 5}}
        updateItems={() => {}}
        content={({item})=><RenderOptions item={item} navigation={navigation}></RenderOptions>}></LazyLoad>
    </StyledView>
  );
};

export default GroupScreen;
