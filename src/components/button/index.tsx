import { Image, Platform, Text, TouchableOpacity, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { s } from '../../utils/s'
import assets from "../../assets"
import { routes } from "../../constants"
import { c } from "../../utils/c"

export interface IButton {
  children: string | JSX.Element
  onPress: () => void
  className?: string
}

export const Button = ({ children, onPress, className }: IButton) => {

  return (
    <TouchableOpacity className={c(className!, 'w-full')} onPress={onPress}>
      <LinearGradient colors={['#434F74', '#313B5C']} className="py-3.5 rounded-xl" >
        <Text style={[s.medium, { fontWeight: '600', color: '#95A4D0' }]}
          className="text-center text-[16px]">
          {children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}


export const GroupButton = ({ navigation }: { navigation: any }) => {
  const items: Array<{ url: string } & IButton> = [
    {
      children: 'Send',
      url: assets.Send,
      onPress: () => navigation.navigate(routes.SEND)
    },
    {
      children: 'Receive',
      url: assets.Receive,
      onPress: () => navigation.navigate(routes.RECEIVE)
    },
    {
      children: 'Swap',
      url: assets.swap,
      onPress: () => navigation.navigate(routes.SWAP)
    }
  ]
  return (
    <LinearGradient colors={['#434F74', '#313B5C']}
      className="flex-row justify-evenly py-3 items-center rounded-xl overflow-hidden">
      <TouchableOpacity onPress={items[0].onPress}
        className="flex-1 flex-row justify-center items-center py-1" >
        <Text style={[s.medium, { fontWeight: '600' }]}
          className="text-center text-[14px] text-light">
          {items[0].children}
        </Text>
        <Image source={{ uri: items[0].url }} style={{ height: 11, width: 20, resizeMode: 'contain', marginHorizontal: 2 }} />
      </TouchableOpacity>

      <View className="w-[0.8px] h-5 bg-black/30" />

      <TouchableOpacity onPress={items[1].onPress}
        className="flex-1 flex-row justify-center items-center py-1" >
        <Text style={[s.medium, { fontWeight: '600' }]}
          className="text-center text-[14px] text-light">
          {items[1].children}
        </Text>
        <Image source={{ uri: items[1].url }} style={{ height: 11, width: 20, resizeMode: 'contain', marginHorizontal: 2 }} />
      </TouchableOpacity>

      <View className="w-[0.8px] h-5 bg-black/30" />

      <TouchableOpacity onPress={items[2].onPress}
        className="flex-1 flex-row justify-center items-center py-1" >
        <Text style={[s.medium, { fontWeight: '600' }]}
          className="text-center text-[14px] text-light">
          {items[2].children}
        </Text>
        <Image source={{ uri: items[2].url }} style={{ height: 11, width: 20, resizeMode: 'contain', marginHorizontal: 2 }} />
      </TouchableOpacity>

    </LinearGradient >
  )
}
