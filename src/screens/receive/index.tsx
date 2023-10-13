import { Text, View } from "react-native"
import QRCode from 'react-native-qrcode-svg'
import assets from "../../assets"
import { BtnIcon } from "../../components/btn"
import Clipboard from '@react-native-clipboard/clipboard';
import { useState } from "react"
import { Header } from "../../components"
import { routes } from "../../constants"
import { Container } from "../../components/container"
import { s } from '../../utils/s'

const value = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
const coin = 'Ethereum (ETH)'
export const Receive = ({ navigation }: { navigation: any }) => {
  const [flag, setFlag] = useState(false)
  const _click_to_Copy = () => {
    Clipboard.setString(value)
    setFlag(true)
    setTimeout(() => {
      setFlag(false)
    }, 500);
  }

  return (
    <Container className="p-0">
      <Header title={routes.RECEIVE} navigation={navigation} />
      <View className="flex  items-center justify-center space-y-5 flex-1 py-9">
        <View className="flex items-center justify-center py-5 bg-white rounded-lg w-2/3 mx-auto">
          <QRCode
            value={value}
            size={200}
            color="white"
            backgroundColor="black"
          />
          <Text style={s.medium} className="text-center px-5 pt-3 text-xs text-primary">{value}</Text>
        </View>
        <Text style={s.regular} className="text-light text-center px-9">
          Send only
          <Text style={s.semibold}>&nbsp;{coin}&nbsp;</Text>
          to this address.
          Sending any other coins may result in permanent loss
        </Text>
        <View className="h-12 w-12 flex justify-center items-center rounded-2xl mx-auto">
          <BtnIcon uri={assets.Copy} onPress={_click_to_Copy} />
        </View>
        <Text
          style={s.medium}
          className="text-center text-xs text-light -translate-y-4">{flag ? 'Copied' : 'Copy'}</Text>
      </View>
    </Container>
  )
}
