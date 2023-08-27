import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const AboutScreen = () => {
  return (
    <View
      style={{ flex: 1 }}
      className={` gap-2 bg-white dark:bg-[${colors.darkColors.body}]`}
    >
      <Text
        className={`font-bold text-xl self-center text-black dark:text-[${colors.darkColors.text}]`}
      >
        About Us
      </Text>

      <Text
        className={` text-m text-black dark:text-[${colors.darkColors.text}]`}
      >
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text
        className={` text-m text-black dark:text-[${colors.darkColors.text}]`}
      >
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text
        className={` text-m text-black dark:text-[${colors.darkColors.text}]`}
      >
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text
        className={` text-s opacity-80 text-black dark:text-[${colors.darkColors.text}]`}
      >
        App Version : 18.1.1a
      </Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
