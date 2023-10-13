import { Image, Text, View } from "react-native"
import { Header } from "../../components"
import { Container } from "../../components/container"
import Assets from "../../assets"
import { s } from '../../utils/s'
import React from "react"
import Graph from "../../components/graph"
import { GroupButton, } from "../../components/button"

export const Market = ({ navigation }: { navigation: any }) => {
  return (
    <Container className="relative p-0">
      <Header title="Market" navigation={navigation} />
      <View className="flex-1 justify-between py-9">
        <View className="flex-row justify-between items-center px-6">
          <View className="flex-row gap-3">
            <Image source={{ uri: Assets['eth'] }} className="h-14 w-14" />
            <View className="flex-row items-center justify-between">
              <View className="">
                <Text style={[s.medium]} className="text-xl text-light">Ethereum</Text>
                <Text style={[s.regular]} className="text-xs uppercase text-light/60">2.3 ETH</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={s.medium} className="text-xl text-light text-right">$3344</Text>
          </View>
        </View>
        <View className="">
          <Graph />
        </View>
        <View className="px-9">
          <GroupButton navigation={navigation} />
        </View>
      </View>
    </Container>
  )
}


