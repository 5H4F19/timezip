import { useEffect, useState } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { routes } from "../../constants"
import { s } from '../../utils/s'

const rnBiometrics = new ReactNativeBiometrics()

let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
let payload = epochTimeSeconds + 'some message'
const password = '1234'

export const Passcode = ({ navigation }: { navigation: any }) => {
  const [BiometryType, setBiometryType] = useState<string>('')
  const [otp, setotp] = useState<number[]>([])
  const [len, setLen] = useState<number>(otp.length)
  useEffect(() => {
    setLen(otp.length)
  }, [otp, setLen])

  useEffect(() => {
    otp.length === 4 && verify()
  }, [otp])

  useEffect(() => {
    handleTouchID()
    return () => {
      handleTouchID()
    }
  }, [])

  const handleTouchID = async () => {
    const { success, error } = await rnBiometrics.simplePrompt({ promptMessage: 'Sign with fingerprint', cancelButtonText: 'PIN' })
    if (success) {
      navigation.navigate(routes.BOTTOM_TAB)
    } else {
      console.log('error')
    }
  }

  const add = (num: number) => {
    if (otp?.length === 5) return
    if (otp) setotp([...otp, num])
  }

  const verify = () => {
    otp.join('') === password ? navigation.navigate(routes.BOTTOM_TAB) : setotp([])
  }

  return (
    <View className="flex flex-1 bg-black items-center py-20">
      <View className="flex items-center gap-y-3">
        <Text style={s.medium} className="text-xl text-light">Enter passcode</Text>
        <View className="flex flex-row">
          {[...Array(4)].map((_, i) => <Dot key={i + 'dot'} active={len > i} />)}
        </View>
      </View>

      <View className="flex flex-row flex-wrap items-center justify-center mx-20 mt-auto space-y-5">
        {[...Array(9)].map((_, i) => (
          <TouchableOpacity className="w-1/3 p-0 m-0" key={i + 'num'} onPress={() => add(i + 1)}>
            <View className="mx-auto flex h-14 w-14 items-center justify-center bg-primary rounded-full">
              <Text
                style={s.semibold}
                className="text-2xl text-light">{i + 1}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity className="w-1/3 p-0 m-0" onPress={() => add(0)}>
          <View className="mx-auto flex h-14 w-14 items-center justify-center bg-primary rounded-full">
            <Text className="text-2xl text-light">{0}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center justify-center w-full my-auto">
        <TouchableOpacity className="" onPress={handleTouchID}>
          <Image style={{ resizeMode: 'contain', tintColor: '#ccc' }} className="h-10 w-12 mx-auto" source={require('../../assets/fingerprint.png')} />
        </TouchableOpacity>
      </View>
      <Text style={s.medium} className="text-light text-xs text-center mt-auto mx-16">
        Passcode adds an extra layer of security when using this app
      </Text>
    </View>
  )
}

const Dot = ({ active }: { active: boolean }) => {
  console.log(active)
  return (
    <View className={`${active ? 'bg-slate-100' : 'bg-transparent'} w-3 h-3 mx-1 rounded-full border border-slate-100`} />
  )
}
