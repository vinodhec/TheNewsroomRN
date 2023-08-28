import { View, Text, ScrollView, Linking } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import PressableOpacity from "./PressableOpacity";
import { ROUTES } from "../constants";
import Share from "react-native-share";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";

const MenuScreen = ({ navigation }) => {
  const menus = [
    { label: "Bookmarks", icon: "bookmarks", path: ROUTES.BOOKMARKS },
    { label: "About Us", icon: "md-people-sharp", path: ROUTES.ABOUTUS },
    // { label: "Themes", icon: "md-color-palette" },
    { label: "Settings", icon: "settings", path: ROUTES.SETTINGS },
    {
      label: "Share App",
      icon: "ios-share-social",
      onPress: () => {
        const shareOptions: any = {
          title: "Share via",
          message:
            "Stay informed on the go with TheNewsRoom. Breaking news, personalized updates, and trusted sources all in one place.\n https://play.google.com/store/apps/details?id=com.tvisoft.TheNewsRoom&hl=en&gl=US",
          // social: Share.Social.WHATSAPP,
        };

        Share.open(shareOptions);
      },
    },
    { label: "Contact Us", icon: "mail", path: ROUTES.CONTACT },
    {
      label: "Rate the App",
      icon: "md-thumbs-up-sharp",
      externalLink:
        "https://play.google.com/store/apps/details?id=com.tvisoft.TheNewsRoom&hl=en&gl=US",
    },

    {
      label: "Publisher Details",
      icon: "ios-information-circle",
      externalLink: "https://thenewsroom-f5e02.web.app/publishers",
    },
    {
      label: "Privacy Policy",
      icon: "ios-information-circle",
      externalLink: "https://thenewsroom-f5e02.web.app/privacy",
    },
    { label: "On This Day", icon: "newspaper", path: ROUTES.ONTHISDAY },
  ];
  const { colorScheme } = useColorScheme();

  const iconColor =
    colorScheme === "dark" ? colors.darkColors.text : colors.black;
  return (
    <View
      className={` bg-white dark:bg-[${colors.darkColors.body}]`}
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? colors.darkColors.body : "white",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
        }}
      >
        {menus.map(({ label, icon, path, externalLink, onPress }, index) => {
          return (
            <PressableOpacity
              key={index}
              onPress={() => {
                if (path) {
                  navigation.navigate(path);
                }
                if (externalLink) {
                  Linking.openURL(externalLink);
                }
                if (onPress) {
                  onPress();
                }
              }}
            >
              <View className=" p-2 pl-4 mb-1 flex-row  items-center">
                <Icon name={icon} size={22} color={iconColor}></Icon>
                <Text
                  className={`ml-3 text-xl text-black dark:text-[${colors.darkColors.text}]`}
                >
                  {label}
                </Text>
                <View className="ml-auto">
                  <Icon
                    name="chevron-forward-sharp"
                    color={iconColor}
                    size={22}
                  ></Icon>
                </View>
              </View>
            </PressableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
