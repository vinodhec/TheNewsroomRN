import { StatusBar, StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { NavigationContainer } from "@react-navigation/native";
import SplashNavigator from "./components/Navigators/SplashNavigator";
import { COLORS } from "./constants";
import app from "./firebase/firebase";
import notifee, {
  EventType,
  AndroidImportance,
  AndroidStyle,
} from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
const Test = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
console.log({ app });

let persistor = persistStore(store);

async function onMessageReceived(message) {
  console.log("notifee", message);
  try {
    const channelId = await notifee.createChannel({
      id: "important",
      name: "Important Notifications",
      badge: true,

      // importance: AndroidImportance.HIGH,
    });
    const { title, body, imageUrl } = message.data;
    const style = imageUrl
      ? {
          type: AndroidStyle.BIGPICTURE,
          picture: imageUrl,
        }
      : {
          type: AndroidStyle.BIGTEXT,
          text: body?.slice(0, 50),
        };
    await notifee.displayNotification({
      title,
      // subtitle: '&#129395;',
      body,

      android: {
        style,
        timestamp: Date.now(), // 8 minutes ago
        showTimestamp: true,

        ...(imageUrl && { largeIcon: imageUrl }),
        channelId,
        color: COLORS.primary,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

// messaging().setBackgroundMessageHandler(onMessageReceived);

const App = () => {
  useEffect(() => {
    messaging()
      .subscribeToTopic("news_test")
      .then(() => console.log("Subscribed to topic!"));
    messaging().onMessage(onMessageReceived);
    messaging().setBackgroundMessageHandler(onMessageReceived);
    // onMessageReceived({
    //   data: {
    //     notifee: {
    //       title: "மழை",
    //       body: "சென்னை மற்றும் புறநகர் பகுதிகளில் வேகமான காற்று மற்றும் பரவலாக மழை!",
    //       imageUrl:
    //         '"https://firebasestorage.googleapis.com/v0/b/thenewsroom-f5e02.appspot.com/o/groups%2Frn_image_picker_lib_temp_db8a8d2d-8411-4edc-8c58-829afe33634d.mp4?alt=media&token=1d250064-ac9f-47d1-b664-a805d2aa9bef',
    //       android: {
    //         largeIcon:
    //           "https://firebasestorage.googleapis.com/v0/b/thenewsroom-f5e02.appspot.com/o/groups%2Frn_image_picker_lib_temp_db8a8d2d-8411-4edc-8c58-829afe33634d.mp4?alt=media&token=1d250064-ac9f-47d1-b664-a805d2aa9bef",
    //       },
    //     },
    //   },
    // });

    // requestUserPermission()
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SplashNavigator></SplashNavigator>
          {/* <Test></Test> */}
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

// echo "export PATH=\$PATH:/Users/${USER}/Library/Android/sdk/platform-tools/" >> ~/.bash_profile && source ~/.bash_profile
