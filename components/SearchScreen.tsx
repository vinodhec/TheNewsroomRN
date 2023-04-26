import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectGlobalValue, update} from '../features/global/globalSlice';
import PressableOpacity from './PressableOpacity';
import {StyledView} from './StyledComponents';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewsFeedScreen from './NewsFeedScreen';
import NewsItem from './NewsItem';
import {COLLECTIONS} from '../constants/collections';
import LazyLoad from './LazyLoad';
import Tts from 'react-native-tts';
import DatePicker from 'react-native-date-picker';

const SearchScreen = () => {
  const categories: any = useAppSelector(selectGlobalValue('categories')) ?? [];
  const dispatch = useAppDispatch();

  const [date, setDate] = useState(new Date());
  const [query, setQuery] = useState<any>([]);
  const [date1, setDate1] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [speechStatus, setSpeechStatus] = useState('stopped');

  useEffect(() => {
    setQuery(query => {
      if (selectedCategory) {
        return [['category', '==', selectedCategory]];
      } else {
        return [[]];
      }
    });
  }, [selectedCategory]);
  useEffect(() => {
    Tts.addEventListener('tts-start', event => {
      setSpeechStatus('started');
    });
    Tts.addEventListener('tts-finish', event => {
      // if (speakStatus && speakStatus !== 'stopped') {
      //   setSpeakStatus('stopped');
      // }
      setSpeechStatus('stopped');
    });
    Tts.addEventListener('tts-cancel', event => {
      // if (speakStatus &&  speakStatus !== 'cancelled') {
      //   setSpeakStatus('cancelled');
      // }
      setSpeechStatus('cancelled');
    });
  }, []);

  useEffect(() => {
    const temp = new Date(date.getTime());
    temp.setDate(temp.getDate() + 1);
    setDate1(temp);
    console.log(date, temp);
  }, [date]);

  
  const addToBookMark = id => {
    console.log({bookmarks, id},'feed');
    let value;
    if (bookmarks.includes(id)) {
      value = bookmarks.filter(bid => bid != id);
    } else {
      value = [...bookmarks, id];
    }
    console.log({value})
    dispatch(
      update({
        valueType: 'bookmarks',

        value,
      } as any),
    );
  };

  const startOfToday = new Date();
  const bookmarks: any = useAppSelector(selectGlobalValue('bookmarks')) ?? [];

  return (
    <View className="mt-4 p-2">
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          date.setUTCHours(0, 0, 0, 0);

          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View>
        <Text className="text-black text-l mb-4">Filter by Category</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          className="flex-row  gap-4 border-1 "
          contentContainerStyle={{justifyContent: 'center', borderWidth: 1}}
          horizontal>
          {categories.slice(1).map((category, index) => {
            return (
              <Pressable
                className="items-center justify-center"
                key={index}
                onPress={() => {
                  if (category === selectedCategory) {
                    return setSelectedCategory(undefined);
                  }
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
                    {category.slice(0, 1)}
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
          showsHorizontalScrollIndicator={false}
          className="flex-row  gap-4"
          contentContainerStyle={{
            justifyContent: 'center',
            borderWidth: 1,
            paddingHorizontal: 8,
          }}
          horizontal>
          <Pressable onPress={() => setOpen(true)}>
            <StyledView
              className={
                'items-center border-1 border-solid justify-center  ' +
                'bg-red-100'
              }>
              <View className="flex-row items-center justify-center px-1">
                <Icon name="date-range" size={22} color={'#C82128'}></Icon>
                <Text
                  className={
                    'text-l p-2 capitalize items-center text-center ' +
                    'text-red-700'
                  }>
                  Date Picker
                </Text>
              </View>
            </StyledView>
          </Pressable>
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
      {selectedCategory && (
        <View>
          <View
            style={{borderBottomWidth: 0.35, borderStyle: 'solid'}}
            className="mt-6"></View>
          <Text className="font-bold text-lg text-black-900 mt-2">
            Search Results
          </Text>
          {/* <PressableOpacity  className="divide-y-2 divide-solid bg-red-600 p-2 px-4 self-end mt-4">
          <Text className='text-white'>Search</Text>
        </PressableOpacity> */}
          <LazyLoad
            collectionName={COLLECTIONS.NEWS}
            // options={{customIds:bookmarks, isCustom:true}}
            options={{
              limit: 5,
              query: query,
            }}
            updateItems={() => {}}
            content={({item}) => {
              const isBookmarked=bookmarks?.includes(item?.id)

              return (
                <NewsItem
                  {...item}
                  key={item?.id}
                  addToBookMark={addToBookMark}
                  isBookmarked={isBookmarked}

                  speechStatus={speechStatus}></NewsItem>
              );
            }}></LazyLoad>
        </View>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
