import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AboutScreen = () => {
  return (
    <View className="grow-1 gap-2">
      <Text className="font-bold text-xl self-center text-black"> About Us</Text>

      <Text className="text-m">
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text className="text-m">
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text className="text-m">
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text className="text-s opacity-80">App Version : 18.1.1a</Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
