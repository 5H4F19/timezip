import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { getYForX, Vector } from "react-native-redash";
import { s } from '../../utils/s'

import { GraphIndex, graphs } from "./model";

const CURSOR = 32;

interface CursorProps {
  index: Animated.SharedValue<GraphIndex>;
  translation: Vector<Animated.SharedValue<number>>;
}

const Cursor = ({ index, translation }: CursorProps) => {
  const [value, setValue] = useState<number>(getYForX(graphs[index.value].data.path, translation.x.value) || 0)
  const isActive = useSharedValue(false);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      isActive.value = true;
    },
    onActive: (event) => {
      translation.x.value = event.x;
      translation.y.value =
        getYForX(graphs[index.value].data.path, translation.x.value) || 0;
      runOnJS(setValue)(getYForX(graphs[index.value].data.path, translation.x.value)!);
    },
    onEnd: () => {
      isActive.value = false;
    },
  });

  const style = useAnimatedStyle(() => {
    const translateX = translation.x.value - CURSOR / 2;
    const translateY = translation.y.value - CURSOR / 2;
    return {
      transform: [
        { translateX },
        { translateY },
        { scale: withSpring(isActive.value ? 1 : 0) },
      ],
    };
  });


  return (
    <View style={StyleSheet.absoluteFill}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View style={StyleSheet.absoluteFill}>
            <Animated.View style={[style]}
              className="h-8 w-8 justify-center items-center rounded-full bg-light/20">
              <View className="h-3 w-3 bg-light rounded-full" />
            </Animated.View>
          </Animated.View>
          <Animated.Text className="text-light" style={[s.medium, style, { marginTop: 30 }]}>
            {(value ?? 0).toFixed(3)}
          </Animated.Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Cursor;
