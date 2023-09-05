import { View, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import HighlightScreen from "../HighlightScreen";
import MenuScreen from "../MenuScreen";
import TopTabNavigator from "./TopTabNavigator";
import { COLORS, ROUTES } from "../../constants";
import colors from "../../constants/colors";

import CustomTabBarButton from "../CustomTabBarButton";
import PressableOpacity from "../PressableOpacity";
import { useColorScheme } from "nativewind";
import HomeScreenNavigator from "./HomeScreenNavigator";
import GroupScreenNavigator from "./GroupScreenNavigator";
import MenuScreenNavigator from "./MenuScreenNavigator";
import HighlightNavigator from "./HighlightNavigator";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarHideOnKeyboard: true,
          unmountOnBlur: true,
          // headerRight: () => (
          //   <View style={{flexDirection: 'row',justifyContent:'space-between', width:64,marginRight:24}}>
          //     <PressableOpacity onPress={()=>{
          //       navigation.navigate(ROUTES.SEARCH)
          //     }}>
          //       <Icon name={'search'} size={22} color={COLORS.white} />
          //     </PressableOpacity>
          //     <PressableOpacity onPress={toggleColorScheme }>
          //       <Icon name={colorScheme ==='dark'?'sunny-outline':'ios-moon-sharp'} size={22} color={COLORS.white} />
          //     </PressableOpacity>
          //   </View>
          // ),
          // headerTintColor: COLORS.white,

          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarInactiveTintColor: COLORS.white,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            let IconWrapper = Icon;

            if (route.name === ROUTES.HOME) {
              iconName = focused ? "ios-home-sharp" : "ios-home-outline";
            } else if (route.name === ROUTES.HIGHLIGHT) {
              iconName = focused ? "sticky-note-2" : "sticky-note";
              IconWrapper = focused ? MaterialIcons : FontAwesome5;
            } else if (route.name === ROUTES.GROUP) {
              iconName = focused ? "wallet" : "wallet-outline";
            } else if (route.name === ROUTES.MENU) {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <IconWrapper name={iconName} size={22} color={color} />;
          },
        };
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreenNavigator}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="home" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HIGHLIGHT}
        component={HighlightNavigator}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="home" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.GROUP}
        component={GroupScreenNavigator}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="home" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.MENU}
        component={MenuScreenNavigator}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="home" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    // backgroundColor: COLORS.bottomTabBG,
    borderTopWidth: 0,
    backgroundColor: COLORS.bottomTabBG,
    borderWidth: 0,
    bottom: 20,
    right: 20,
    left: 20,
    height: 50,
    borderRadius: 100,
  },
  tabBarItemActive: {
    backgroundColor: colors.gradientForm,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
});

export default BottomTabNavigator;
