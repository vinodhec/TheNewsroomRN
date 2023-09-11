import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { ref } from "firebase/database";
import ViewShot from "react-native-view-shot";
import { ROUTES } from "../constants";
import PressableOpacity from "./PressableOpacity";
import ShareIcon from "./ShareIcon";
import { StyledView } from "./StyledComponents";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";

const HighlightItem = ({ item }) => {
  const ref = useRef();
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
console.log('HighlightItem',item)
  const isItems = item?.value?.length > 0;
const [isHighlight,setIsHighlight]=useState(false)
  return (
    isItems ? (
      <ViewShot ref={ref}>
        <StyledView
          className={`bg-white mb-5 p-2 dark:bg-[${colors.darkColors.body}]`}
          style={{
            backgroundColor:
              colorScheme === "dark" ? colors.darkColors.body : "white",
          }}
        >
          <Text
            className="self-center"
            style={{
              paddingVertical: 4,
              paddingHorizontal: 12,
              backgroundColor:
                colorScheme === "dark" ? "#FFA1A5" : "rgba(200, 33, 40, 0.1)",
              color: colorScheme === "dark" ? colors.white : colors.black,
              borderRadius: 29,
            }}
          >
            {item?.date}
          </Text>
          {item?.value?.map(({ highlight,showHighlight, id }) => {
            console.log({highlight})
           
           
            return (
              <PressableOpacity
                onPress={() => {
                  navigation.navigate(ROUTES.NEWSFEED_ID, { id });
                }}
              >
                <Text
                  className={`text-black dark:text-[${colors.darkColors.text}]`}
                  style={{
                    lineHeight: 18,
                    marginTop: 16,
                  }}
                  key={id}
                >
                  {highlight}
                </Text>
              </PressableOpacity>
            );
          })}
          <View className="self-end" style={{ width: 60 }}>
            <ShareIcon
              viewref={ref}
              isBookmarked={undefined}
              addToBookMark={undefined}
              news={undefined}
            ></ShareIcon>
          </View>
        </StyledView>
      </ViewShot>
    ):null
  );
};

export default HighlightItem;
