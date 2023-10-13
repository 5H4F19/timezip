


import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SimpleSwipe = () => {
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [gestureName, setGestureName] = useState('none');

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 200) {
          setGestureName('swipe');
          return true;
        }
        return false;
      },
      onPanResponderMove: (evt, gestureState) => {
        const newX = Math.max(0, Math.min(circlePosition.x + gestureState.dx, SCREEN_WIDTH - 100));
        setCirclePosition({ x: newX, y: 0 });
      },
      onPanResponderRelease: () => {
        setGestureName('none');
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { transform: [{ translateX: circlePosition.x }] }]} {...panResponder.panHandlers} />
      <Text style={styles.text}>{`Gesture: ${gestureName}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


