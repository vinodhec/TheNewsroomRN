import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PressableOpacity from './PressableOpacity';

const BreakingNews = ({imageUrl}) => {
  const [fallBack, setFallBack] = useState(
    imageUrl ?? 'https://etimg.etb2bimg.com/photo/90937508.cms',
  );

  return (
    <View style={{position: 'relative', backgroundColor: '#FAE9EA',}}className='py-2'>
      <ImageBackground style={{width:51, height:67,position:'absolute',top:0,left:0,zIndex:1023}} source={require('./../assets/breakingnews.png')}>
        <Text className="-rotate-45 text-white" style={{fontSize:8}}>Breaking News</Text>
      </ImageBackground>
      <PressableOpacity>
        <Icon
          style={{position: 'absolute', top: -6, right: 8}}
          name="close"
          color="#C82128CC"
          size={22}></Icon>
      </PressableOpacity>
      <View className="flex-row p-2 mb-2 w-10/12">
        <Image
          source={{uri: fallBack}}
          onError={() => {
            setFallBack(
              'https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png',
            );
          }}
          style={{minWidth: 80, minHeight: 80}}></Image>
        <View className=" ml-4 pr-3 items-start justify-start">
          <Text   className="text-m text-left  text-black font-bold">Breaking news

</Text>
          <Text numberOfLines={3} className="text-sm">
            An Indian lottery winner has said he is so overwhelmed with requests
            for financial help that he regrets getting the jackpot.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({});
