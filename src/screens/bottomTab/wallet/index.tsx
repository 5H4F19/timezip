import React, { Key, useRef, useState } from "react"
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Assets from '../../../assets'
import { routes } from "../../../constants"
import { Container } from "../../../components/container"
import { s } from '../../../utils/s'
import { Img } from "../../../components/img"
import { Routes } from "../.."
import { Button } from "../../../components/button"



export const Wallet = ({ navigation }: { navigation: any }) => {
  return (
    <Container className="p-0">
      <Walletbox nav={navigation} />
      <ScrollView>
        <Quick_send navigation={navigation} />
        <Wallets navigation={navigation} />
        <View className="my-20 flex flex-col">
          {Routes.map(x => (
            <Button className="mt-2 px-5" onPress={() => navigation.navigate(x.path)}>{x.path}</Button>
          ))}
        </View>
      </ScrollView>
    </Container>
  )
}


const Walletbox = ({ nav }: { nav: any }) => {
  return (
    <View className="relative w-[90vw] h-44 mx-auto">
      <View className="absolute w-full h-full bg-[#313C5C]/40 rotate-[8deg] rounded-2xl"></View>
      <View className="flex justify-between w-full h-full p-6 bg-[#313C5C] rounded-2xl shadow-2xl">
        <View className="flex flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Img src={Assets.Man} />
            <Text style={[s.medium]} className="text-light text-xl ml-2">5H419</Text>
          </View>
          <TouchableOpacity
            onPress={() => nav.navigate(routes.SETTING)}>
            <Img src={Assets.Filter} size={20} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[s.medium]} className="text-middim">Total balance</Text>
          <Text style={[s.medium]} className="text-3xl text-light">USD 2352323</Text>
        </View>
      </View>
    </View>

  )
}


const Quick_send = ({ navigation }: { navigation: any }) => {
  return (
    <View className="w-[90vw] mx-auto my-10">
      <View className="flex-row justify-between items-baseline">
        <Text style={[s.medium]} className="text-xl text-light">Quick Send</Text>
        <TouchableOpacity className="cursor-pointer">
          <Text style={[s.regular]} className="text-xs text-dim">View all</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center my-2">
        <TouchableOpacity className="h-16 mr-1 overflow-hidden justify-center items-center w-16 rounded-3xl bg-[#313C5C]">
          <Img src={Assets.Plus} size={20} className="opacity-20" />
        </TouchableOpacity>
        <FlatList
          horizontal
          className=""
          data={[0, 1, 2, 3, 4]}
          renderItem={props => <QuickIcon onPress={() => navigation.navigate(routes.SEND)} src="https://picsum.photos/200" />} />
      </View>
    </View>
  )
}

export const QuickIcon = ({ onPress, src }: { onPress?: () => void, src: string }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="h-16 mr-1 overflow-hidden justify-center items-center w-16 rounded-3xl bg-[#313C5C]">
      <Image source={{ uri: src }} className="h-full w-full" />
    </TouchableOpacity>

  )
}

interface ICard {
  chain: string,
  symbol: String,
  price: number,
  amount: number
}
const cards: ICard[] = [
  {
    chain: "Ethereum",
    symbol: 'eth',
    price: 235234,
    amount: 123,
  },
  {
    chain: "Bitcoin",
    symbol: 'btc',
    price: 2323424,
    amount: 213
  }
]

const Wallets = ({ navigation }: { navigation: any }) => {
  return (
    <View className="w-[90vw] mx-auto">
      <View className="flex-row justify-between items-baseline">
        <Text style={[s.medium]} className="text-xl text-light">Wallets</Text>
        <TouchableOpacity className="cursor-pointer">
          <Text style={[s.regular]} className="text-xs text-dim">View all</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center my-2">
        <FlatList
          horizontal
          className=""
          data={cards}
          renderItem={({ item }) => <WalletCard onPress={() => navigation.navigate(routes.MARKET)} item={item} />} />
      </View>
    </View>
  )
}

const WalletCard = ({ item, onPress }: { onPress: () => void, item: ICard }) => {
  const { chain, symbol, price, amount } = item
  return (
    <TouchableOpacity className="bg-[#313C5C] p-4 rounded-3xl w-52 mr-3" onPress={onPress}>
      <View className="flex-row gap-3">
        <Image source={{ uri: Assets[symbol as keyof typeof Assets] }} className="h-14 w-14" />
        <View>
          <View className="">
            <Text style={[s.medium]} className="text-xl text-light">{chain}</Text>
            <Text style={[s.regular]} className="text-xs uppercase text-light/60">{amount} {symbol}</Text>
          </View>
        </View>
      </View>
      <Text style={[s.regular, { fontWeight: '600' }]} className="text-2xl my-4 text-center text-light">${price}</Text>
      <Text
        style={[s.regular, { fontWeight: '600' }]}
        className="text-sm text-center text-light">8.82%
        <Text className="text-dim">&nbsp;($434)</Text>
      </Text>
    </TouchableOpacity>

  )
}
