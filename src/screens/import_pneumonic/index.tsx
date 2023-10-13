import { View, Text, TextInput, } from "react-native"
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { s } from '../../utils/s'
import Clipboard from "@react-native-clipboard/clipboard";
import { routes } from "../../constants";

const _dummy = ["secure", "transfer", "funds", "store", "manage", "crypto", "digital", "money", "private", "key", "encryption", "onboarding"];

export const Import_pneumonic = ({ navigation }: { navigation: any }) => {
  const [phrases, setPhrases] = useState<string>()

  const handlePaste = async () => {
    const text = await Clipboard.getString()
    setPhrases(text)
  }

  return (
    <Container className="flex-1 bg-primary py-12 flex justify-between">
      <View className="flex items-center">
        <Text style={[s.medium, { fontWeight: '600' }]} className="text-2xl text-light my-1">Import recovery phrase</Text>
        <View className="h-5" />
        <Text style={[s.medium]} className="justify-self-start w-full text-light my-1.5">Phrase</Text>
        <View className="w-full relative">
          <TouchableOpacity
            className="absolute z-10 top-2 right-3"
            onPress={handlePaste}
          >
            <Text style={[s.medium, { fontWeight: '700' }]} className="text-[#5A92BC]">Paste</Text>
          </TouchableOpacity>
          <TextInput
            style={[s.medium, { backgroundColor: '#222A47', width: '100%', height: 200, borderRadius: 20 }]}
            multiline value={phrases}
            editable
            onChangeText={(e) => setPhrases(e)}
            placeholder="Press enter to add" autoFocus
            placeholderTextColor={"#6A7891"}
            className="p-5 text-light placeholder:text-light" />
        </View>
      </View>
      <Button onPress={() => navigation.navigate(routes.BOTTOM_TAB)}>Import</Button>
    </Container>
  )
}

