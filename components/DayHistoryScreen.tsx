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
const delimiter = "^&!32$5_4' ";
const dt = moment().format("MM-DD");
const DayHistoryScreen = ({ navigation }) => {
  const [dayinhistory, setDayinhistory] = useState({ content: "", date: "" });
  const [newHistory, setNewHistory] = useState("");
  useEffect(() => {
    getHistoryDetails(dt).then((data) => {
      const text = data.split(delimiter);
      setDayinhistory({ content: text?.[0], date: text?.[1] });
      setNewHistory(text?.[0]);
    });
  }, []);

  return (
    <View className="p-8">
      {!dayinhistory.content && <ActivityIndicator></ActivityIndicator>}
      {dayinhistory.content && (
        <View>
          <Text className="text-sm">{dayinhistory.content}</Text>
          <Text>
            {dt} -{dayinhistory.date}
          </Text>

          <TextInput
            value={newHistory}
            onChangeText={(text) => {
              setNewHistory(text);
            }}
            numberOfLines={10}
            style={{ borderWidth: 2, padding: 10 }}
          ></TextInput>
          <Button
            title="Save"
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
