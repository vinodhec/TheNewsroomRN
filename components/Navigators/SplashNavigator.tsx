import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../HomeScreen";
import { omit } from "lodash";
import Splash from "../SplashScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import { useAppDispatch } from "../../app/hooks";
import { COLLECTIONS } from "../../constants/collections";
import { update } from "../../features/global/globalSlice";
// import FirestoreService from '../../firebase/firestoreService';
import { COLORS, ROUTES } from "../../constants";
import SearchScreen from "../SearchScreen";
import Icon from "react-native-vector-icons/Ionicons";
import PressableOpacity from "../PressableOpacity";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import FirestoreService from "../../firebase/firestoreService";
import useUpdateGlobal from "../../hooks/useUpdateGlobal";
import useSelectGlobal from "../../hooks/useSelectGlobal";
import AdminLoginScreen from "../AdminLoginScreen";
const Stack = createStackNavigator();

const SplashNavigator = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const updateValue = useUpdateGlobal();
  const colorSchemeGlobal = useSelectGlobal("colorScheme");
  console.log(colorScheme);
  useEffect(() => {
    console.log({ colorScheme });
    updateValue("colorScheme", colorScheme);
  }, [colorScheme]);
  useEffect(() => {
    console.log({ colorSchemeGlobal }, { colorScheme });
    if (colorSchemeGlobal && colorSchemeGlobal !== colorScheme) {
      toggleColorScheme();
    }
    FirestoreService.getDocuments(COLLECTIONS.BREAKING, {
      limit: 1,
      orderBy: "timestamp",
      orderByDir: "desc",
    }).then((data) => {
      if (data?.length > 0) {
        dispatch(update({ valueType: "breaking", value: data?.[0] } as any));
      }
    });
  }, []);
  useEffect(() => {
    FirestoreService.getDocuments(COLLECTIONS.GROUPS, {}).then((data) => {
      dispatch(
        update({
          valueType: "groups",

          value: data.map((dd) => {
            return omit(dd, "timestamp");
          }),
        } as any)
      );
    });
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "The Newsroom",
        headerStyle: {
          backgroundColor: "#C82128",
        },
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 64,
              marginRight: 24,
            }}
          >
            <PressableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.SEARCH);
              }}
            >
              <Icon name={"search"} size={22} color={COLORS.white} />
            </PressableOpacity>
            <PressableOpacity onPress={toggleColorScheme}>
              <Icon
                name={
                  colorScheme === "dark" ? "sunny-outline" : "ios-moon-sharp"
                }
                size={22}
                color={COLORS.white}
              />
            </PressableOpacity>
          </View>
        ),
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Login"
        component={AdminLoginScreen}
        options={{ headerTitle: "Admin Login" }}
      ></Stack.Screen>
      <Stack.Screen name="Main" component={BottomTabNavigator}></Stack.Screen>
      <Stack.Screen
        name={ROUTES.SEARCH}
        component={SearchScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default SplashNavigator;
