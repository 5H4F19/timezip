import { useRef, useState } from "react"
import { Alert, Animated, FlatList, Image, Modal, PanResponder, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Header, Sheet } from "../../components"
import { BtnIcon } from "../../components/btn"
import assets from "../../assets"
import { routes } from "../../constants"
import { Heading } from "../../components/heading"
import { Container } from "../../components/container"
import { Button } from "../../components/button"
import { QuickIcon } from "../bottomTab/wallet"
import { s } from '../../utils/s'
import { truncate } from "../../utils/truncate"
import { Img } from "../../components/img"
import { SlideButton } from "../../components/slideButton"
import { Numbpad } from "../../components/numbpad"

interface IUsers {
  name: string,
  address: string,
  url: string
}

export const Send = ({ navigation }: { navigation: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [user, setUser] = useState<IUsers>(quick_users[0])
  const [amount, setAmount] = useState<string>('124')
  return (
    <>
      <QuickUsers
        visible={visible}
        setVisible={setVisible}
        setUser={setUser}
      />
      <Container className="p-0">
        <Header title={routes.SEND} navigation={navigation} />
        <View className="flex-1 justify-between mx-5 my-7">
          <View className="flex-row justify-start items-center rounded-3xl p-3 bg-[#222A47]">
            <QuickIcon src="https://picsum.photos/200" />
            <View className="ml-2">
              <Text style={[s.medium]} className="text-xl text-light">{user?.name}</Text>
              <Text style={[s.medium]} className="text-xs text-dim">{truncate(user?.address!)}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="ml-auto mr-3">
              <Img src={assets.Arrow_Down} className="opacity-30" />
            </TouchableOpacity>
          </View>
          <View className="flex gap-y-2">
            <Text style={[s.semibold]} className="text-4xl text-center text-light">${amount}</Text>
            <Numbpad amount={amount} setAmount={setAmount} />
            <SlideButton
              onUnlock={() => { }}
              title="Unlock to slide"
            />
          </View>
        </View>

      </Container>
      {isOpen && <Sheet title="tttt">
        <View className="space-y-4">
          <View className="flex flex-row justify-between items-center bg-secondary px-5 py-3 rounded-t-xl overflow-hidden">
            <BtnIcon onPress={() => setIsOpen(false)} uri={assets.ArrowLeft} />
            <Heading className="capitalize">Confirm send</Heading>
            <View className="w-9" />
          </View>
          <View className="space-y-3 mx-5">
            <View className="space-y-2 flex items-center bg-primary rounded-lg px-4 py-2 w-full text-light font-['Inter-SemiBold'] text-sm">
              <View className="flex flex-row justify-between w-full">
                <Text className="text-light font-['Inter-Medium']">Asset</Text>
                <Text className="text-light/60 font-['Inter-Medium']">dfg</Text>
              </View>
              <View className="bg-gray-800 h-[1px] w-full" />
              <View className="flex flex-row justify-between w-full">
                <Text className="text-light font-['Inter-Medium']">From</Text>
                <Text className="text-light/60 font-['Inter-Medium']">Asset</Text>
              </View>
              <View className="bg-gray-800 h-[1px] w-full" />
              <View className="flex flex-row justify-between w-full">
                <Text className="text-light font-['Inter-Medium']">To</Text>
                <Text className="text-light/60 font-['Inter-Medium']">Asset</Text>
              </View>
            </View>
            <View className="space-y-2 flex items-center bg-primary rounded-lg px-4 pt-1 py-2 w-full text-light font-['Inter-SemiBold'] text-sm">
              <View className="flex flex-row justify-between w-full">
                <Text className="text-light font-['Inter-Medium']">Network Fee</Text>
                <Text className="text-light/60 font-['Inter-Medium']">Asset</Text>
              </View>
              <View className="bg-slate-800 h-[1px] w-full" />
              <View className="flex flex-row justify-between w-full">
                <Text className="text-light font-['Inter-Medium']">Max total</Text>
                <Text className="text-light/60 font-['Inter-Medium']">Asset</Text>
              </View>
            </View>
            <View>
              <Button onPress={() => { }}>Confirm</Button>
            </View>
          </View>
        </View>
      </Sheet>}
    </>
  )
}

const quick_users: IUsers[] = [
  {
    name: 'John doe',
    address: 'nfo3b4ugbn292u',
    url: "https://picsum.photos/200"
  },
  {
    name: 'John doe 1',
    address: 'nfo3b4ugbn292u',
    url: "https://picsum.photos/200"
  },
  {
    name: 'John doe 2',
    address: 'nfo3b4ugbn292u',
    url: "https://picsum.photos/200"
  }
]

function QuickUsers({ visible, setUser, setVisible }: { visible: boolean, setUser: (u: IUsers) => void, setVisible: (b: boolean) => void }) {
  function handlePress(user: IUsers) {
    setUser(user)
    setVisible(false)
  }
  return (
    <Modal visible={visible}>
      <Container className="p-4">
        <Text
          style={[s.medium]}
          className="capitalize text-center mb-5 text-[15px] text-[#434F74]">Quick Users</Text>
        <FlatList
          data={quick_users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              className="flex-row mb-3 justify-start items-center rounded-3xl p-3 bg-[#222A47]">
              <QuickIcon src="https://picsum.photos/200" />
              <View className="ml-2">
                <Text style={[s.medium]} className="text-xl text-light">{item.name}</Text>
                <Text style={[s.medium]} className="text-xs text-dim">{truncate(item.address!)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Container>
    </Modal>
  )

}


