import { View, Text, FlatList, Animated, ViewToken } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, ROUTES, isAdmin } from "../constants";
import FirestoreService from "../firebase/firestoreService";
import { dbRef, getHistoryDetails } from "../firebase/firebaseRealtimeDB";
import NewsItem from "./NewsItem";
import { useSharedValue } from "react-native-reanimated";
import Tts from "react-native-tts";
import Icon from "react-native-vector-icons/Ionicons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectGlobalValue, update } from "../features/global/globalSlice";
import { StyledView } from "./StyledComponents";
import PressableOpacity from "./PressableOpacity";
import { COLLECTIONS } from "../constants/collections";
import moment from "moment";
import BreakingNews from "./BreakingNews";
import useSelectGlobal from "../hooks/useSelectGlobal";
import useUpdateGlobal from "../hooks/useUpdateGlobal";
import LazyLoad from "./LazyLoad";
import colors from "../constants/colors";
import FirebaseAuthService from "../firebase/firebaseAuthService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
GoogleSignin.configure({
  webClientId:
    "463401124803-c43cg9r71n53g9qgcuetcs58l9bhjb61.apps.googleusercontent.com",
});
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
const NewsFeedScreen = ({ route, navigation }) => {
  const temp = route.params?.category;
  const groups = route.params?.groups;
  const id = route.params?.id;
  const updateValue = useUpdateGlobal();
  const dispatch = useAppDispatch();
  const bookmarks: any = useAppSelector(selectGlobalValue("bookmarks")) ?? [];
  console.log({ bookmarks });
  const newsDeleted = useSelectGlobal("newsDeleted");
  const [category, setCategory] = useState(temp === "All" ? "" : temp);
  const [speechStatus, setSpeechStatus] = useState("stopped");
  function onAuthStateChanged(user) {
    console.log(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
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
    onGoogleButtonPress();
  }, []);

  useEffect(() => {
    if (newsDeleted) {
      updateValue("newsDeleted", null);
    }
  }, [newsDeleted]);
  useEffect(() => {
    getHistoryDetails(moment().format("MM-DD"));
  }, []);
  return (
    <StyledView className={`dark:bg-[${colors.darkColors.bgColor}]`}>
      <View>
        <BreakingNews></BreakingNews>
      </View>

      {!(groups?.id || id) && isAdmin && (
        <PressableOpacity
          onPress={() => {
            navigation.push(ROUTES.ADD);
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 80,
            position: "absolute",
            bottom: 260,
            right: 10,
            height: 80,
            zIndex: 1028,
          }}
        >
          <Icon name="ios-add-circle-sharp" color={COLORS.primary} size={80} />
        </PressableOpacity>
      )}
      {!newsDeleted && (
        <LazyLoad
          collectionName={COLLECTIONS.NEWS}
          customIds={bookmarks}
          isCustom={route.params.isCustom}
          // options={{customIds:bookmarks, isCustom:true}}
          options={{
            limit: 5,
            query: [
              ["category", "==", category],
              ["groups", "==", groups?.id],
              ["id", "==", id],
            ],
          }}
          updateItems={() => {}}
          content={({ item }) => {
            let isBookmarked;
            try {
              isBookmarked = bookmarks?.includes(item?.id);
            } catch (error) {
              console.log({ bookmarks });
              console.error(error);
            }

            return (
              <NewsItem
                {...item}
                key={item?.id}
                speechStatus={speechStatus}
                isBookmarked={isBookmarked}
              ></NewsItem>
            );
          }}
        ></LazyLoad>
      )}
    </StyledView>
    // <FlatList
    //   data={newsItems}
    //   keyExtractor={item => item?.id}
    //   // onViewableItemsChanged={({ viewableItems: vItems }) => {
    //   //   viewableItems.value = vItems;
    //   // }}
    //   onEndReached={getData}
    //   onEndReachedThreshold={0.5}
    //   renderItem={({item}) => {
    //     return <NewsItem {...item} key={item?.id} speechStatus={speechStatus}></NewsItem>;
    //   }}
    //   contentContainerStyle={{padding: 16}}></FlatList>
  );
};

export default NewsFeedScreen;
