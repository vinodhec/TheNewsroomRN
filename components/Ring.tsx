import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '../constants';

const SIZE =10;


type RingPropType = {
  index: number;
};

const Ring = (props: RingPropType) => {
  const {index} = props;
  const opacityValue = useSharedValue(0.7);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    opacityValue.value = withDelay(
      index * 400,
      withRepeat(
        withTiming(0, {
          duration: 2000,
        }),
        -1,
        false,
      ),
    );
    scaleValue.value = withDelay(
      index * 400,
      withRepeat(
        withTiming(4, {
          duration: 2000,
        }),
        -1,
        false,
      ),
    );
  }, [opacityValue, scaleValue, index]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleValue.value,
        },
      ],
      opacity: opacityValue.value,
    };
  });

  return <Animated.View style={[styles.dot, rStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLORS.primary,
    position: 'absolute',left:5,
    top:5
  },
});

export default Ring;