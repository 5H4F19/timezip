import { Text, View } from "react-native"
import assets from "../../assets"
import { BtnIcon } from "../btn"
import { s } from '../../utils/s'

export function Header({ navigation, title }: { title: string, navigation: any }) {
  return <View className="flex flex-row justify-between items-center px-5 rounded-t-xl overflow-hidden">
    <BtnIcon
      onPress={() => { navigation.goBack() }}
      uri={assets.Back} />
    <Text style={[s.medium]} className="capitalize text-[15px] text-[#434F74]">{title}</Text>
    <View className="w-9" />
  </View>
}
