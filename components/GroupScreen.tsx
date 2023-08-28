import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { COLLECTIONS } from "../constants/collections";
import { StyledView } from "./StyledComponents";
import PressableOpacity from "./PressableOpacity";
import { ROUTES } from "../constants";
import FirestoreService from "../firebase/firestoreService";
import LazyLoad from "./LazyLoad";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";

const RenderOptions = ({ item, navigation, reload }) => {
  const { colorScheme } = useColorScheme();

  const [fallBack, setFallBack] = useState(
    item.imageUrl ??
      "https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png"
  );
  return (
    <PressableOpacity
      onLongPress={async () => {
        Alert.alert("Confirm Delete", "Do you want to delete the Group?", [
          { text: "No" },
          {
            text: "Yes",
            onPress: async () => {
              await FirestoreService.deleteDocument(
                COLLECTIONS.GROUPS,
                item.id
              );
              reload(true);
              Alert.alert("Success", "Group is deleted successfully");
            },
          },
        ]);
      }}
      onPress={() => {
        navigation.navigate(ROUTES.GROUPDETAILS, { groups: item });
      }}
    >
      <View
        className={`flex-row p-4 mb-2 bg-white dark:bg-[${colors.darkColors.body}]`}
        style={{
          backgroundColor:
            colorScheme === "dark" ? colors.darkColors.body : "white",
        }}
      >
        <Image
          source={{ uri: fallBack }}
          onError={() => {
            setFallBack(
              "https://andersnoren.se/themes/koji/wp-content/themes/koji/assets/images/default-fallback-image.png"
            );
          }}
          style={{ minWidth: 80, minHeight: 80 }}
        ></Image>
        <View className="grow-1 ml-4">
          <Text
            className={`text-l font-bold text-black dark:text-[${colors.darkColors.text}]`}
          >
            {item?.title}
          </Text>
          <Text
            className={`text-xs opacity-75 text-black dark:text-[${colors.darkColors.text}]`}
          >
            {item?.label}
          </Text>
          <Text
            className={`text-m text-black dark:text-[${colors.darkColors.text}]`}
          >
            {item?.description}
          </Text>
        </View>
      </View>
    </PressableOpacity>
  );
};

const GroupScreen = ({ navigation }) => {
  const [reload, setReload] = useState(false);

  return (
    <StyledView className={`bg-white dark:bg-[${colors.darkColors.body}]`}>
      {!reload && (
        <LazyLoad
          collectionName={COLLECTIONS.GROUPS}
          options={{ limit: 5 }}
          updateItems={() => {}}
          content={({ item }) => (
            <RenderOptions
              item={item}
              navigation={navigation}
              reload={() => {
                setReload(true);
                setReload(() => false);
              }}
            ></RenderOptions>
          )}
        ></LazyLoad>
      )}
    </StyledView>
  );
};

export default GroupScreen;
