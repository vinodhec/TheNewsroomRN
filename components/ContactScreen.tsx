import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import PressableOpacity from "./PressableOpacity";
import FirestoreService from "../firebase/firestoreService";
import { COLLECTIONS } from "../constants/collections";
import { ROUTES } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../constants/colors";
import { useColorScheme } from "nativewind";
const ContactScreen = ({ navigation }) => {
  const [text, setText] = useState<any>();
  const [submitted, setSubmitted] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View
      className={`flex-1 items-center justify-center bg-white dark:bg-[${colors.black}]`}
      style={{
        backgroundColor:
          colorScheme === "dark" ? colors.darkColors.bgColor : "white",
      }}
    >
      {submitted === false && (
        <View
          className={`border-1 border-solid p-4 w-full gap-2 shadow-sm pb-6 bg-white dark:bg-[${colors.darkColors.body}]`}
          style={{
            backgroundColor:
              colorScheme === "dark" ? colors.darkColors.body : "white",
          }}
        >
          <Text
            className="text-sm font-bold"
            style={{
              color: colorScheme === "dark" ? colors.darkColors.text : "black",
            }}
          >
            Tell us your thoughts?
          </Text>
          <TextInput
            style={{
              borderWidth: 0.5,
              color: colorScheme === "dark" ? colors.darkColors.text : "black",
            }}
            placeholderTextColor={
              colorScheme === "dark" ? colors.darkColors.text : "black"
            }
            multiline
            numberOfLines={10}
            className="w-full"
            onChangeText={(text) => {
              setText(text);
            }}
            placeholder="Tell us on how can we improve...."
            textAlignVertical="top"
          ></TextInput>
          <View className="mt-4 flex-row gap-2">
            <PressableOpacity className="bg-red-400 p-2 px-4">
              <Text className="text-white">Cancel</Text>
            </PressableOpacity>
            <PressableOpacity
              className="bg-red-700 p-2 px-4"
              onPress={() => {
                FirestoreService.createDocument(COLLECTIONS.CONTACTUS, {
                  content: text,
                }).then(() => {
                  setSubmitted(true);
                });
              }}
            >
              <Text className="text-white">Submit</Text>
            </PressableOpacity>
          </View>
        </View>
      )}
      {submitted && (
        <View className="border-1 border-solid p-4  gap-2 shadow-sm pb-6 bg-white">
          <Icon name="md-thumbs-up-sharp" color={"#c20"} size={44}></Icon>
          <Text className="font-bold text-lg text-black">Thank You!!!</Text>
          <Text className="text-sm ">
            Your feedback has been successfully submitted.
          </Text>
          <View>
            <PressableOpacity
              className="bg-red-700 p-2 px-4 w-36 text-center mt-6"
              onPress={() => {
                navigation.navigate(ROUTES.HOME);
              }}
            >
              <Text className="text-white text-center">Back To Home</Text>
            </PressableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({});
