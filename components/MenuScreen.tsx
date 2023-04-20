import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import PressableOpacity from './PressableOpacity';
import {ROUTES} from '../constants';

const MenuScreen = ({navigation}) => {
  const menus = [
    {label: 'Bookmarks', icon: 'bookmarks', path: ROUTES.BOOKMARKS},
    {label: 'About Us', icon: 'md-people-sharp', path: ROUTES.ABOUTUS},
    {label: 'Themes', icon: 'md-color-palette'},
    {label: 'Settings', icon: 'settings', path: ROUTES.SETTINGS},
    {label: 'Share App', icon: 'ios-share-social'},
    {label: 'Contact Us', icon: 'mail', path: ROUTES.CONTACT},
    {label: 'Rate the App', icon: 'md-thumbs-up-sharp'},
    {label: 'Feedback', icon: 'chatbox', path: ROUTES.FEEDBACK},
    {
      label: 'Privacy Policy',
      icon: 'ios-information-circle',
      path: ROUTES.PRIVACY,
    },
    {label: 'On This Day', icon: 'newspaper', path: ROUTES.ONTHISDAY},
  ];
  return (
    <ScrollView contentContainerStyle={{marginTop: 8}}>
      {menus.map(({label, icon, path}, index) => {
        return (
          <PressableOpacity
            key={index}
            onPress={() => {
              if (path) {
                navigation.navigate(path);
              }
            }}>
            <View className=" p-2 pl-4 mb-1 flex-row  items-center">
              <Icon name={icon} size={22}></Icon>
              <Text className="ml-3">{label}</Text>
              <View className="ml-auto">
                <Icon name="chevron-forward-sharp" size={22}></Icon>
              </View>
            </View>
          </PressableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default MenuScreen;
