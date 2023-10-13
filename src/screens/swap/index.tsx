import { Image, TextInput, TouchableOpacity, View } from "react-native"
import { Text } from "react-native"
import assets from "../../assets"
import { IToken, Search } from "../../components/search"
import { useEffect, useState } from "react"
import { Header } from "../../components"
import { Container } from "../../components/container"
import { SlideButton } from "../../components/slideButton"
import { s } from '../../utils/s'
import { Numbpad } from "../../components/numbpad"

const tokens: IToken[] = [
  {
    title: 'BTC',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  },
  {
    title: 'ETH',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    title: 'Bdfdfd',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    title: 'dfdf',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
]




export const Swap = ({ navigation }: { navigation: any }) => {
  const [selected, setSelected] = useState<IToken>(tokens[0])
  const [selected2, setSelected2] = useState<IToken>(tokens[1])

  const [box_focused, setBox_focused] = useState<1 | 2>(1)

  const [value, setValue] = useState<string>('23')
  const [value2, setValue2] = useState<string>('443')

  useEffect(() => {
  }, [selected, selected2, value, value2])

  const handleSwap = () => {
    /*  const temp = selected
     setSelected(selected2)
     setSelected2(temp) */
    const temp2 = value
    setValue(value2)
    setValue2(temp2)
    console.log('swap', selected.title, selected2.title)
  }
  // TODO: 1. Handle to swap currency
  const handleOnSwap = () => { }

  return (
    <Container className="p-0">
      <Header title="Swap" navigation={navigation} />
      <View className="flex-1 justify-between py-5">
        <View className="">
          <View className="flex mx-5 rounded-xl">
            <Box1
              focused={box_focused}
              set_focused={setBox_focused}
              value={value}
              selected={selected}
              selected2={selected2}
              setSelected={setSelected} />

            <Swapper onPress={handleSwap} />

            <Box2
              focused={box_focused}
              set_focused={setBox_focused}
              value={value2}
              selected={selected}
              selected2={selected2}
              setSelected2={setSelected2} />

            <Conversion />
          </View>
        </View>
        <Numbpad amount={box_focused === 1 ? value : value2} setAmount={box_focused === 1 ? setValue : setValue2} />
        <View className="mx-5">
          <SlideButton
            onUnlock={handleOnSwap}
            title="Swipe to swap"
          />
        </View>
      </View>
    </Container>
  )
}

interface AllProps {
  focused: 1 | 2,
  set_focused: (b: 1 | 2) => void,
  value: string,
  selected: IToken,
  setSelected: (s: IToken) => void,
  selected2: IToken,
  setSelected2: (s: IToken) => void,
}
const Box1 = ({ focused, set_focused, value, selected, setSelected, selected2 }: Partial<AllProps>) => {
  return (
    <TouchableOpacity
      onPress={() => set_focused?.(1)}
      activeOpacity={1}
      className="mb-2 bg-[#222A47] p-3 rounded-3xl flex-row justify-between w-full items-center">
      <View
        className="p-2 py-3">
        <Text style={s.medium} className="text-2xl text-light">
          {value}{focused === 1 && "|"}
        </Text>
      </View>
      <View className="rounded-full bg-[#29324E]">
        <Search items={tokens.filter(x => x != selected2)} onSelect={setSelected!} selected={selected!} title="" />
      </View>
    </TouchableOpacity>
  )
}

const Box2 = ({ focused, set_focused, value, selected, selected2, setSelected2 }: Partial<AllProps>) => {
  return (
    <TouchableOpacity
      onPress={() => set_focused?.(2)}
      activeOpacity={1}
      className="flex bg-[#222A47] p-3 rounded-3xl flex-row justify-between w-full items-center">
      <View className="p-2 py-3">
        <Text style={s.semibold} className="text-2xl text-light">
          {value}{focused === 2 && "|"}
        </Text>
      </View>
      <View className="rounded-full bg-[#29324E]">
        <Search items={tokens.filter(x => x != selected)} onSelect={setSelected2!} selected={selected2!} title="" />
      </View>
    </TouchableOpacity>
  )
}


const Swapper = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      className="z-20 shadow-2xl top-[34%] left-[41%] bg-[#222A47] h-10 w-10 flex justify-center items-center rounded-2xl absolute"
      onPress={onPress}>
      <Image source={{ uri: assets.swap }} style={{ height: 15, width: 100, resizeMode: 'contain' }} />
    </TouchableOpacity>

  )
}
const Conversion = () => {
  return (
    <View className="flex-row justify-between items-center mx-14 my-3">
      <Text style={s.medium} className="text-[#434F74]">1 BTC</Text>
      <Image
        className="rotate-90"
        source={{ uri: assets.swap }}
        style={{ height: 11, tintColor: '#434F74', width: 100, resizeMode: 'contain' }} />
      <Text style={s.medium} className="text-[#434F74]">2 ETH</Text>
    </View>
  )
}
