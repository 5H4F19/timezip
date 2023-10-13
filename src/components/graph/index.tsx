import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { mixPath, useVector } from "react-native-redash";
import { s } from '../../utils/s'
import { GraphIndex, graphs, SIZE } from "./model";
import Cursor from "./cursor";
import { c } from "../../utils/c";
import Header from "./header";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Graph = () => {
  const translation = useVector();
  const transition = useSharedValue(0);
  const previous = useSharedValue<GraphIndex>(0);
  const current = useSharedValue<GraphIndex>(0);
  const animatedProps = useAnimatedProps(() => {
    const previousPath = graphs[previous.value].data.path;
    const currentPath = graphs[current.value].data.path;
    return {
      d: mixPath(transition.value, previousPath, currentPath),
    };
  });

  const [selected, setSelected] = useState<number>(0)

  return (
    <View className="mx-auto">
      <View className="flex-row justify-between">
        {graphs.map((graph, index) => {
          return (
            <TouchableWithoutFeedback
              key={graph.label}
              onPress={() => {
                setSelected(index)
                previous.value = current.value;
                transition.value = 0;
                current.value = index as GraphIndex;
                transition.value = withTiming(1);
              }}
            >
              <Animated.View className={c(index === selected ? "bg-[#3A4569]" : "bg-transparent", "py-1.5 px-2.5 rounded-lg")}>
                <Text style={[s.semibold]}
                  className={c(index === selected ? "text-light" : "text-[#516884]", "text-sm  uppercase")}>{graph.label}</Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      <View className="">
        <Svg width={SIZE} height={SIZE - 100}>
          <AnimatedPath
            animatedProps={animatedProps}
            fill="transparent"
            stroke="#C2D8F3"
            strokeWidth={2}
          />
        </Svg>
        <Cursor translation={translation} index={current} />
      </View>
    </View>
  );
};

export default Graph;
