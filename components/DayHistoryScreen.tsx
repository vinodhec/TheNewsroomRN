import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  getHistoryDetails,
  updateHistoryDetails,
} from "../firebase/firebaseRealtimeDB";
import { TextInput } from "react-native-gesture-handler";
import { async } from "@firebase/util";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";
const delimiter = "^&!32$5_4' ";
const dt = moment().format("MM-DD");
const DayHistoryScreen = ({ navigation }) => {
  const [dayinhistory, setDayinhistory] = useState({ content: "", date: "" });
  const [newHistory, setNewHistory] = useState("");

  const { colorScheme } = useColorScheme();
  const darkMode=colorScheme === "dark"
  
  useEffect(() => {
    getHistoryDetails(dt).then((data) => {
      const text = data.split(delimiter);
      setDayinhistory({ content: text?.[0], date: text?.[1] });
      setNewHistory(text?.[0]);
    });
  }, []);

  return (
    <View className="p-8 " style={{ backgroundColor:
      darkMode ? colors.darkColors.body : "white",flex:1 }}>
      {!dayinhistory.content && <ActivityIndicator></ActivityIndicator>}
      {dayinhistory.content && (
        <View>
          <Text className="text-sm text-black dark:text-[#B6C2CF]">{dayinhistory.content}</Text>
          <Text className="text-black dark:text-[#FFA1A5]">
            {dt} -{dayinhistory.date}
          </Text>

          <TextInput
            value={newHistory}
            onChangeText={(text) => {
              setNewHistory(text);
            }}
            numberOfLines={10}
            style={{ borderWidth: 2, padding: 10,borderColor:darkMode?'#B6C2CF':'black' ,color:darkMode?'#B6C2CF':'black'}}
          ></TextInput>
          <Button
            title="Save"
            color={darkMode?'#FFA1A5':'#C82128'}
           
            onPress={async () => {
              await updateHistoryDetails(
                dt,
                newHistory + delimiter + dayinhistory.date
              );
              ToastAndroid.show("Success", ToastAndroid.LONG);
              navigation.goBack();
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default DayHistoryScreen;

const styles = StyleSheet.create({});
