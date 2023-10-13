import { Text, TouchableOpacity, View } from "react-native"
import { CardProps } from "../../common/types"
import { Img } from "../img"

export const Actionbuttons = ({ item }: { item: CardProps }) => {
  return (
    <TouchableOpacity
      className="flex items-center justify-center mx-3"
      onPress={item.onPress}>
      <View className="h-14 w-14 bg-quaternary/80 rounded-3xl flex items-center justify-center">
        <Img src={item.image} size={20} />
      </View>
      <Text
        className={`text-[12px] leading-5 font-['Inter-SemiBold'] capitalize text-light/60`}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )
}
