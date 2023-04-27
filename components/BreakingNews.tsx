import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const BreakingNews = ({imageUrl}) => {
  const [fallBack, setFallBack] = useState(
    imageUrl ??
      'https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png',
  );

  return (
    <View className='flex-row p-2' style={{background: #FAE9EA}}>
      <Image
        source={{uri: fallBack}}
        onError={() => {
          setFallBack(
            'https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png',
          );
        }}
        style={{minWidth: 80, minHeight: 80}}></Image>
      <View className='p-2'>
        <Text>Congress president polls | Ashok Gehlot not to contest; </Text>
        <Text numberOfLines={2}>
          An Indian lottery winner has said he is so overwhelmed with requests
          for financial help that he regrets getting the jackpot.
        </Text>
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({});
