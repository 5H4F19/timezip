import { Image, Text, TouchableOpacity, View } from "react-native"
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
    <TouchableOpacity className={c(className!, "mx-auto shadow-xl")} onPress={onPress}>
      <View className="border border-br rounded-lg px-3 py-1" >
        <Text className="text-slate-400">
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const GroupButton = ({ navigation }: { navigation?: any }) => {
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
    <LinearGradient colors={['#00C97F', '#007484']}
      className="w-11/12 mx-auto flex-row justify-evenly py-3 items-center rounded-xl overflow-hidden">

      {items?.map((btn, index) => (
        <>
          <TouchableOpacity onPress={btn.onPress}
            className="flex-1 flex-row justify-center items-center py-1" >
            <Text style={[s.medium, { fontWeight: '600' }]}
              className="text-center text-[14px] text-[#C8FDFC]">
              {btn.children}
            </Text>
            <Image source={{ uri: btn.url }} style={{ height: 11, width: 20, resizeMode: 'contain', marginHorizontal: 2 }} />
          </TouchableOpacity>
          {index !== items.length - 1 && (<View className="w-[1px] h-5 bg-[#C8FDFC]/50" />
          )}
        </>
      ))}


    </LinearGradient >
  )
}
