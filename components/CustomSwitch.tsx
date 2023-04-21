import React, {useState} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import PressableOpacity from './PressableOpacity';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 44,
          width: 100,
          backgroundColor: getSelectionMode == 1 ?'#C82128': "#C821281A",
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: 'transparent',

          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <PressableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {getSelectionMode == 1 && (
            <View
              className="bg-white "
              style={{height: 20, width: 20, borderRadius: 10}}></View>
          )}
          {getSelectionMode == 2 && (
            <Text
              style={{
                color: '#C82128',
              }}>
              {option2}
            </Text>
          )}
        </PressableOpacity>
        <PressableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {getSelectionMode == 2 && (
            <View
              className="bg-white "
              style={{height: 20, width: 20, borderRadius: 10}}></View>
          )}
          {getSelectionMode == 1 && (
            <Text
              style={{
                color: 'white',
              }}>
              {option1}
            </Text>
          )}
        </PressableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
