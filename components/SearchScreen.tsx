import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectGlobalValue, update } from "../features/global/globalSlice";
import PressableOpacity from "./PressableOpacity";
import { StyledView } from "./StyledComponents";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import NewsFeedScreen from "./NewsFeedScreen";
import NewsItem from "./NewsItem";
import { COLLECTIONS } from "../constants/collections";
import Tts from "react-native-tts";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import LazyLoad from "./LazyLoad";
import { useColorScheme } from "nativewind";
import colors from "../constants/colors";
const SearchScreen = () => {
  const categories: any = useAppSelector(selectGlobalValue("categories")) ?? [];
  const dispatch = useAppDispatch();

  const { colorScheme } = useColorScheme();

  const [date, setDate] = useState(new Date());
  const [query, setQuery] = useState<any>(undefined);
  const [date1, setDate1] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedDate, setSelectedDate] = useState<any>();
  const [speechStatus, setSpeechStatus] = useState("stopped");

  useEffect(() => {
    if (selectedCategory) {
      setQuery((query) => {
        return isCustomDateSelected || selectedDate
          ? [getSelectedCategoryQuery(), ...getDateQuery()]
          : [getSelectedCategoryQuery()];
      });
    }
  }, [selectedCategory]);
  useEffect(() => {
    Tts.addEventListener("tts-start", (event) => {
      setSpeechStatus("started");
    });
    Tts.addEventListener("tts-finish", (event) => {
      // if (speakStatus && speakStatus !== 'stopped') {
      //   setSpeakStatus('stopped');
      // }
      setSpeechStatus("stopped");
    });
    Tts.addEventListener("tts-cancel", (event) => {
      // if (speakStatus &&  speakStatus !== 'cancelled') {
      //   setSpeakStatus('cancelled');
      // }
      setSpeechStatus("cancelled");
    });
  }, []);

  useEffect(() => {
    if (!["This Week", "Last Week"].includes(selectedDate)) {
      const temp = new Date(date.getTime());
      temp.setDate(temp.getDate() + 1);
      setDate1(temp);
    }
  }, [date]);
  function getSelectedCategoryQuery() {
    return ["category", "==", selectedCategory];
  }

  function getDateQuery() {
    return [
      ["timestamp", ">=", date],
      ["timestamp", "<", date1],
    ];
  }
  useEffect(() => {
    if (date && date1 && (isCustomDateSelected || selectedDate)) {
      setQuery((query) => {
        return selectedCategory
          ? [getSelectedCategoryQuery(), ...getDateQuery()]
          : getDateQuery();
        // return [["timestamp", ">=", moment(date).valueOf()], ["timestamp", "<", moment(date1).valueOf()]]
      });
    }
  }, [date1]);

  useEffect(() => {
    if (selectedDate === "Today") {
      const d = new Date();
      d.setUTCHours(0, 0, 0, 0);

      setDate(d);
    } else if (selectedDate === "This Week") {
      const d = moment().startOf("week");

      setDate(d.toDate());
      const temp = new Date();
      temp.setUTCHours(0, 0, 0, 0);
      temp.setDate(temp.getDate() + 1);
      setDate1(temp);
    } else if (selectedDate === "Last Week") {
      const d = moment().startOf("week").subtract(6, "days");

      setDate(d.toDate());
      const temp = moment().startOf("week").toDate();
      setDate1(temp);
    }
  }, [selectedDate]);

  const addToBookMark = (id) => {
    let value;
    if (bookmarks.includes(id)) {
      value = bookmarks.filter((bid) => bid != id);
    } else {
      value = [...bookmarks, id];
    }

    dispatch(
      update({
        valueType: "bookmarks",

        value,
      } as any)
    );
  };
  const [isCustomDateSelected, setIsCustomDateSelected] = useState(false);
  const startOfToday = new Date();
  const bookmarks: any = useAppSelector(selectGlobalValue("bookmarks")) ?? [];

  return (
    <View
      className="pt-4 p-2"
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === "dark" ? colors.darkColors.body : "white",
      }}
    >
      <DatePicker
        modal
        open={open}
        mode="date"
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          date.setUTCHours(0, 0, 0, 0);

          setDate(date);
          setIsCustomDateSelected(true);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View>
        <Text
          style={{
            color: colorScheme === "dark" ? colors.darkColors.text : "black",
          }}
          className="text-black text-l mb-4"
        >
          Filter by Category
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          className="flex-row  gap-4 border-1 "
          contentContainerStyle={{ justifyContent: "center", borderWidth: 1 }}
          horizontal
        >
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
                }}
              >
                <StyledView
                  className={
                    "items-center border-1 border-solid justify-center rounded-full w-10 h-10 " +
                    (selectedCategory !== category
                      ? "bg-red-100"
                      : "bg-red-700")
                  }
                >
                  <Text
                    className={
                      "text-2xl capitalize items-center text-center " +
                      (selectedCategory === category
                        ? "text-red-100"
                        : "text-red-700")
                    }
                  >
                    {category.slice(0, 1)}
                  </Text>
                </StyledView>
                <Text
                  style={{
                    color:
                      colorScheme === "dark" ? colors.darkColors.text : "black",
                  }}
                  className="text-xs"
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <Text
          className="text-black text-l mb-4 mt-8"
          style={{
            color: colorScheme === "dark" ? colors.darkColors.text : "black",
          }}
        >
          Filter by Date
        </Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          className="flex-row  gap-4"
          contentContainerStyle={{
            justifyContent: "center",
            borderWidth: 1,
            paddingHorizontal: 8,
          }}
          horizontal
        >
          <Pressable
            onPress={() => {
              setOpen(true);
              setSelectedDate(undefined);
            }}
          >
            <StyledView
              className={
                "items-center border-1 border-solid justify-center  " +
                "bg-red-100"
              }
            >
              <View className="flex-row items-center justify-center px-1">
                <Icon name="date-range" size={22} color={"#C82128"}></Icon>
                <Text
                  className={
                    "text-l p-2 capitalize items-center text-center " +
                    "text-red-700"
                  }
                >
                  {isCustomDateSelected && !selectedDate
                    ? moment(date).format("DD MMM YY")
                    : "Date Picker"}
                </Text>
              </View>
            </StyledView>
          </Pressable>
          {["Today", "This Week", "Last Week"].map((category, index) => {
            return (
              <Pressable
                className="items-center justify-center"
                key={index}
                onPress={() => {
                  setSelectedDate(category);
                  setIsCustomDateSelected(false);
                }}
              >
                <StyledView
                  className={
                    "items-center border-1 border-solid justify-center  " +
                    (selectedDate !== category ? "bg-red-100" : "bg-red-700")
                  }
                >
                  <Text
                    className={
                      "text-l p-2 capitalize items-center text-center " +
                      (selectedDate === category
                        ? "text-red-100"
                        : "text-red-700")
                    }
                  >
                    {category}
                  </Text>
                </StyledView>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      {query ? (
        <View>
          <View
            style={{ borderBottomWidth: 0.35, borderStyle: "solid" }}
            className="mt-6"
          ></View>
          <Text
            className="font-bold text-lg text-black-900 mt-2"
            style={{
              color: colorScheme === "dark" ? colors.darkColors.text : "black",
            }}
          >
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
            ListEmptyComponent={
              <Text
                style={{
                  color:
                    colorScheme === "dark" ? colors.darkColors.text : "black",
                }}
              >
                No Results
              </Text>
            }
            updateItems={() => {}}
            content={({ item }) => {
              const isBookmarked = bookmarks?.includes(item?.id);

              return (
                <NewsItem
                  {...item}
                  key={item?.id}
                  addToBookMark={addToBookMark}
                  isBookmarked={isBookmarked}
                  speechStatus={speechStatus}
                ></NewsItem>
              );
            }}
          ></LazyLoad>
        </View>
      ) : null}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
