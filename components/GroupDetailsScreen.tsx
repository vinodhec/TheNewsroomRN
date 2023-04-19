import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const GroupDetailsScreen = ({route}) => {
  console.log({route});
  return (
    <View>
      <Text>GroupDetailsScreen {route.params?.item?.label}</Text>
    </View>
  );
};

export default GroupDetailsScreen;

const styles = StyleSheet.create({});
