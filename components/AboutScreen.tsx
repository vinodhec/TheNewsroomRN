import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";

const AboutScreen = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? colors.darkColors.body : "white",
      }}
      className={` gap-2 bg-white dark:bg-[${colors.darkColors.body}]`}
    >
      <Text
        className={`font-bold text-xl self-center text-black dark:text-[${colors.darkColors.text}]`}
      >
        About Us
      </Text>

      <Text
        className={`p-2 text-m text-black dark:text-[${colors.darkColors.text}]`}
      >
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text
        className={`p-2 text-m text-black dark:text-[${colors.darkColors.text}]`}
      >
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text
        className={`p-2 text-m text-black dark:text-[${colors.darkColors.text}]`}
      >
        TheNewsRoom is a news app that offer a authentic news from multiple
        national and international news providers.We are quite excited about
        giving the most compelling news stories in the most compelling way.
      </Text>

      <Text
        className={`p-2 text-s opacity-80 text-black dark:text-[${colors.darkColors.text}]`}
      >
        App Version :1.0.0
      </Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
