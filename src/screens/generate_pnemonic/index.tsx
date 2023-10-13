import { View, Text } from "react-native"
import { Img } from "../../components/img";
import Assets from "../../assets";
import { TouchableOpacity } from "react-native";
import { routes } from "../../constants";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { s } from '../../utils/s'

export const Generate_pnemonic = ({ navigation }: { navigation: any }) => {
  // const words = ["cryptocurrency", "wallet", "blockchain", "Bitcoin", "Ethereum", "Litecoin", "digital", "asset", "security", "private", "key", "onboarding"];
  const words = ["secure", "transfer", "funds", "store", "manage", "crypto", "digital", "money", "private", "key", "encryption", "onboarding"];
  return (
    <Container className="flex-1 flex justify-between py-12">
      <View className="flex items-center">
        <Text style={[s.semibold]} className="text-2xl text-light my-1">Your recovery phrase</Text>
        <Text style={[s.regular]} className="text-sm text-dim text-center">Write down or copy these words in the right orders and save them somewhere safe</Text>
        <View className="flex-row mt-10 items-center justify-center flex-wrap mx-5 rounded-lg p-2">
          {words?.map(word => <Word word={word} />)}
        </View>
      </View>

      <TouchableOpacity >
        <Text style={[s.semibold]} className="text-center text-md w-full text-[#5A92BC] my-1.5">
          Copy
        </Text>
      </TouchableOpacity>
      <Button onPress={() => navigation.navigate(routes.CONFIRM_WALLET)}>Confirm</Button>
    </Container>
  )
}

const Word = ({ word }: { word: string }) => {
  return (
    <View className="rounded-lg overflow-hidden m-1">
      <Text style={[s.regular]} className="text-light shadow-md bg-[#313C5C] rounded-xl py-1 px-2 capitalize">{word}</Text>
    </View>
  )
}

