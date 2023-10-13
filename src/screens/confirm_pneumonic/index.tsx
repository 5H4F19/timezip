import { View, Text } from "react-native"
import { Img } from "../../components/img";
import Assets from "../../assets";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { routes } from "../../constants";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { s } from '../../utils/s'
const _dummy = ["secure", "transfer", "funds", "store", "manage", "crypto", "digital", "money", "private", "key", "encryption", "onboarding"];

export const Confirm_pneumonic = ({ navigation }: { navigation: any }) => {
  const [phrases, setPhrases] = useState<string[]>([])
  const [words, setWords] = useState<string[]>(_dummy)

  const _handlePress = (word: string) => {
    const filtered = words.filter(x => x !== word)
    const added = [...phrases as any[], word]
    setWords(w => filtered)
    setPhrases(p => added)
  }
  const _handlePressReverse = (word: string) => {
    const filtered = phrases.filter(x => x !== word)
    const added = [...words as any[], word]
    setWords(w => added)
    setPhrases(p => filtered)
  }

  return (
    <Container className="flex-1 bg-primary py-12 flex  justify-between">
      <View className="flex items-center">
        <Text style={[s.semibold]} className="text-2xl text-light my-1">Confirm recovery phrase</Text>
        <View
          style={[{ backgroundColor: '#222A47', width: '100%', height: 200, borderRadius: 20 }]}
          className="flex flex-row bg- h-40 items-center justify-center mt-7 flex-wrap p-4">
          {phrases.length === 0 &&
            <Text
              style={[s.regular]}
              className="text-light/50 text-center">
              Press the words below to add and press the words here to remove
            </Text>}
          {phrases?.map((word, idx) => <Word bg="bg-primary" onPress={() => _handlePressReverse(word)} index={idx + 1} word={word} />)}
        </View>
        <View className="flex-row mt-10 items-center justify-center flex-wrap mx-5 rounded-lg p-2">
          {words?.map((word, idx) => <Word onPress={() => _handlePress(word)} index={idx + 1} word={word} />)}
        </View>
      </View>
      <Button onPress={() => navigation.navigate(routes.BOTTOM_TAB)}>Confirm</Button>
    </Container>
  )
}

const Word = ({ index, word, onPress, bg }: { bg?: string, index?: number, word: string, onPress?: any }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-lg overflow-hidden m-1">
      <Text style={[s.regular]} className="text-light shadow-md bg-[#313C5C] rounded-xl py-1 px-2 capitalize">
        {word}
      </Text>
    </TouchableOpacity>
  )
}

