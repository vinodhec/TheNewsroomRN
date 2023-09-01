import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// import CustomSwitch from 'react-native-custom-switch';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Video from "react-native-video";
import CustomSwitch from "./CustomSwitch";
import { Dropdown } from "react-native-element-dropdown";
import { useAppSelector } from "../app/hooks";
import { selectGlobalValue } from "../features/global/globalSlice";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";

const SettingsScreen = () => {
  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: "mixed" });
  };

  const { colorScheme } = useColorScheme();
const darkMode=colorScheme==='dark'
  const showNotifications: any = useAppSelector(
    selectGlobalValue("showNotifications")
  );
  const autoPlayVideos: any = useAppSelector(
    selectGlobalValue("autoPlayVideos")
  );
  const groups: any = useAppSelector(selectGlobalValue("groups")) ?? [];

  const [isFocus, setIsFocus] = useState(false);
  const onSelectSwitch = (index) => {
    // Alert.alert('Selected index: ' + index);
  };
  return (
    <View className="p-4 gap-2" style={{ backgroundColor:
      darkMode ? colors.darkColors.body : "white",flex:1 }}>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl text-black dark:text-[#B6C2CF]">News Notification</Text>
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={"On"}
          option2={"Off"}
          onSelectSwitch={onSelectSwitch}
          navigation={undefined}
        />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl text-black dark:text-[#B6C2CF]">Auto Play on videos</Text>
        <CustomSwitch
          selectionMode={1}
          roundCorner={true}
          option1={"On"}
          option2={"Off"}
          onSelectSwitch={onSelectSwitch}
          navigation={undefined}
        />
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-xl text-black dark:text-[#B6C2CF]">Default Sharing App</Text>
        {/* <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={groups}
          search
          maxHeight={300}
          labelField="label"
              valueField="id"
          placeholder={!isFocus ? 'Default Sharing App' : '...'}
          searchPlaceholder="Search..."
          value={{id:'Whatsapp',label:'Whatsapp'}}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            // setValue('category', item.value);
            setIsFocus(false);
          }}
        /> */}
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    marginTop: 16,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
