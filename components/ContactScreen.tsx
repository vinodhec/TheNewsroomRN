import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import PressableOpacity from './PressableOpacity';

const ContactScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="border-1 border-solid p-4 w-full gap-2 shadow-sm pb-6 bg-white">
        <Text className="text-sm font-bold">Tell us your thoughts?</Text>
        <TextInput
          multiline
          numberOfLines={10}
          className="w-full"
          style={{borderWidth: 0.5}}
          placeholder="Tell us on how can we improve...."
          textAlignVertical="top"></TextInput>
        <View className="mt-4 flex-row gap-2">
          <PressableOpacity className="bg-red-400 p-2 px-4">
            <Text className='text-white'>Cancel</Text>
          </PressableOpacity>
          <PressableOpacity className="bg-red-700 p-2 px-4">
            <Text className='text-white'>Submit</Text>
          </PressableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({});
