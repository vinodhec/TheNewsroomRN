import { Animated, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';
import PressableOpacity from './PressableOpacity';

const CustomTopTabBar = (props) => {
    console.log({props})
    const { state, descriptors, navigation, position } = props;
    return (
        <View style={{ flexDirection: 'row' ,overflow:'scroll',flexWrap:'nowrap',width:'auto'}}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
    
            const isFocused = state.index === index;
    
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
    
              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };
    
            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
    
            const inputRange = state.routes.map((_, i) => i);
            const opacity = position.interpolate({
              inputRange,
              outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            });
    
            return (
              <PressableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1,overflow:'scroll',width:150}}
              >
                <Animated.Text  style={{color:isFocused?COLORS.primary:COLORS.black }}>
                  {label}
                </Animated.Text>
              </PressableOpacity>
            );
          })}
        </View>
      );
}

export default CustomTopTabBar

const styles = StyleSheet.create({})