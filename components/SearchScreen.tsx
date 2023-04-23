import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useAppSelector} from '../app/hooks';
import {selectGlobalValue} from '../features/global/globalSlice';
import PressableOpacity from './PressableOpacity';
import {StyledView} from './StyledComponents';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons'
const SearchScreen = () => {
  const categories: any = useAppSelector(selectGlobalValue('categories')) ?? [];
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDate, setSelectedDate] = useState<any>();
  return (
    <View className="mt-4 p-2">
      <View>
        <Text className="text-black text-l mb-4">Filter by Category</Text>
        <ScrollView
          className="flex-row  gap-4 border-1 "
          contentContainerStyle={{justifyContent: 'center', borderWidth: 1}}
          horizontal>
          {categories.map((category, index) => {
            return (
              <Pressable
                className="items-center justify-center"
                key={index}
                onPress={() => {
                  setSelectedCategory(category);
                }}>
                <StyledView
                  className={
                    'items-center border-1 border-solid justify-center rounded-full w-10 h-10 ' +
                    (selectedCategory !== category
                      ? 'bg-red-100'
                      : 'bg-red-700')
                  }>
                  <Text
                    className={
                      'text-2xl capitalize items-center text-center ' +
                      (selectedCategory === category
                        ? 'text-red-100'
                        : 'text-red-700')
                    }>
                    {category.slice(1, 2)}
                  </Text>
                </StyledView>
                <Text className="text-xs">{category}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <Text className="text-black text-l mb-4 mt-8">Filter by Date</Text>
        <ScrollView
          className="flex-row  gap-4 border-1 "
          contentContainerStyle={{justifyContent: 'center', borderWidth: 1,paddingHorizontal:8}}
          horizontal>
            <Pressable><StyledView
                  className={
                    'items-center border-1 border-solid justify-center  ' +
                     'bg-red-100' }
                  >
                    <View className='flex-row items-center justify-center px-1'>
                        <Icon name='date-range' size={22} color={'#C82128'}></Icon>
                  <Text
                    className={
                      'text-l p-2 capitalize items-center text-center ' +
                      
                        
                         'text-red-700'}
                    >
                    Date Picker
                  </Text>
                  </View>
                </StyledView></Pressable>
          {['Today', 'This Week', 'Last Week'].map((category, index) => {
            return (
              <Pressable
                className="items-center justify-center"
                key={index}
                onPress={() => {
                  setSelectedDate(category);
                }}>
                <StyledView
                  className={
                    'items-center border-1 border-solid justify-center  ' +
                    (selectedDate !== category ? 'bg-red-100' : 'bg-red-700')
                  }>
                  <Text
                    className={
                      'text-l p-2 capitalize items-center text-center ' +
                      (selectedDate === category
                        ? 'text-red-100'
                        : 'text-red-700')
                    }>
                    {category}
                  </Text>
                </StyledView>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
