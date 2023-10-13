import { useEffect, useRef, useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputKeyPressEventData, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import { Button } from "../../components/button"
import { Container } from "../../components/container"
import { s } from '../../utils/s'

export const Verify = ({ navigation }: { navigation: any }) => {
  const [otp, setotp] = useState<string[]>(new Array(4).fill(''))
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<TextInput>(null)

  const handleOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>, idx: number) => {
    const value = e.nativeEvent.text
    const newOTP: string[] = [...otp]
    newOTP[idx] = value.substring(value.length - 1)
    if (!value) setActiveIdx(idx - 1)
    else setActiveIdx(idx + 1)
    setotp(newOTP)
  }
  const handleOnKeyDown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, idx: number) => {
    //@ts-ignore
    if (e.nativeEvent['key'] === 'Backspace') setActiveIdx(idx - 1)
  }

  const handleOnSubmit = () => {
    otp.join('').length === 4 && navigation.navigate('Allset')
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeIdx])

  return (
    <Container className="flex-1 items-center justify-center bg-white space-y-10">
      <View className="space-y-2">
        <Text style={s.semibold} className="text-3xl text-center text-light">Verify Email</Text>
        <Text
          style={s.medium}
          className="text-xs text-light/50 text-center px-10">
          Please enter the 4 digit code sent to <Text className="text-[#5BE7C3]">example@gmail.com</Text> email address
        </Text>
      </View>
      <View className="my-4">
        <View className="flex flex-row items-center justify-center gap-x-2">
          {otp.map((_, idx) => (
            <TextInput
              maxLength={1}
              keyboardType="number-pad"
              ref={idx === activeIdx ? inputRef : null}
              key={idx} value={otp[idx]}
              onChange={e => handleOnChange(e, idx)}
              onKeyPress={e => handleOnKeyDown(e, idx)}
              className="w-12 h-12 focus:outline-none px-3 bg-transparent text-center font-semibold border text-light border-light/20 rounded-lg focus:border-light" placeholder="" />
          ))}
        </View>
        <View className="my-2">
          <Button onPress={() => { }}>Verify</Button>
        </View>
        <View className=" flex-row items-center gap-x-2 my-5">
          <Text style={s.medium} className="text-xs text-light/40 text-center">Didn't receive a code?</Text>
          <TouchableOpacity>
            <Text style={s.semibold} className="text-[#5BE7C3]">Resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  )
}
