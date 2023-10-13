import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { Header } from "../../components"
import { routes } from "../../constants"
import { Container } from "../../components/container"

interface Notification {
  heading: string
  message: string
  seen: boolean
  avatar: string
  user: string
}

const _dummy: Notification[] = [
  {
    heading: 'New Transaction Received in Your Crypto Wallet',
    message: "You have received 1.5 BTC from John Smith's Wallet.Login to your app for more details and to manage your funds",
    seen: false,
    avatar: 'bg-green-400',
    user: 'Ahmed'
  },
  {
    heading: 'New Update: Enhanced Security Measures Implemented',
    message: "We have added an additional layer of security to protect your crypto assets.",
    seen: false,
    avatar: 'bg-green-400',
    user: 'Ahmed'
  },
  {
    heading: 'Important Update: New Security Measures',
    message: "We have added an additional layer of security to protect your crypto assets.",
    seen: true,
    avatar: 'bg-green-400',
    user: 'Ahmed'
  },
  {
    heading: 'New Transaction Received in Your Crypto Wallet',
    message: "You have received 1.5 BTC from John Smith's Wallet.Login to your app for more details and to manage your funds",
    seen: true,
    avatar: 'bg-green-400',
    user: 'Ahmed'
  },
  {
    heading: 'Important Update: New Security Measures',
    message: "We have added an additional layer of security to protect your crypto assets.",
    seen: true,
    avatar: 'bg-green-400',
    user: 'Ahmed'
  },

]
export const Notification = ({ navigation }: { navigation: any }) => {
  return <Container className="p-0">
    <Header title={routes.NOTIFICATIONS} navigation={navigation} />
    <View className="mx-5 my-5">
      <FlatList
        data={_dummy}
        renderItem={({ item }) => <Notify item={item} />}
      />
    </View>
  </Container>
}

const Notify = ({ item }: { item: Notification }) => {
  const { avatar, heading, message, seen, user } = item
  return (
    <TouchableOpacity className={`${seen ? "opacity-95" : "opacity-100"} flex flex-row items-start gap-2 my-0.5`}>
      <View className="p-2 bg-[#3F96E4]/20 rounded-full">
        {!seen && <View className="right-1 top-0 absolute rounded-full h-1.5 w-1.5 bg-[#3F96E4]" />}
        <Image source={require('../../assets/notification-bell.png')} className="h-5 w-5" />
      </View>
      <View className="flex space-y-1">
        <Text className={`${seen ? 'text-light/40' : 'font-medium text-light/90'} text-[14px] w-11/12`}>{heading}</Text>
        <View className="flex-row">
          <Text className={`${seen ? 'text-quaternary' : 'font-medium text-light/50'} text-xs w-10/12`}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
