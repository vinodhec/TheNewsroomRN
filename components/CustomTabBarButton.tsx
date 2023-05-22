import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../constants';
import PressableOpacity from './PressableOpacity';

const CustomTabBarButton = props => {
  const {route, children, accessibilityState, onPress} = props;
  
  
    return (
      <PressableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.btnWrapper]}>
    
    
        <View style={[styles.activeWrapper,{ backgroundColor:accessibilityState.selected ? COLORS.white:'transparent'}] }>
          
            <View  style={[styles.activeBtn]}>{children}</View>
          
        </View>
    

      </PressableOpacity>
    );
  
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  activeWrapper: {
    backgroundColor: COLORS.primary,
    // flex: 1,
    justifyContent:'center',
    borderRadius:20,
    alignItems: 'center',
    width:40,
    height:40
  },
  btnWrapper: {
    
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    // backgroundColor:COLORS.bottomTabBG,

    // backgroundColor: COLORS.primary,
    // width:40,
    // height:40,

  },
  activeBtn: {
    // backgroundColor: COLORS.grayLight,
    // width: 50,
    // height: 50,
    // backgroundColor: COLORS.primary,
    // color:COLORS.black,
    // paddingTop: 5,
  },
  inactiveBtn: {
    // flex: 1,
    // backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgGapFiller: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
