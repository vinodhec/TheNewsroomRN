import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const NewsFeedScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.bgColor,
        justifyContent: 'center',
      }}>
      <Text>NewsFeedScreen</Text>
    </View>
  );
};

export default NewsFeedScreen;
