import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { Header, Sheet } from "../../../components"
import { routes } from "../../../constants"
import { useState } from "react"
import { Image } from "react-native"
import { Portal } from "@gorhom/portal"
import { Img } from "../../../components/img"
import assets from "../../../assets"
import { Container } from "../../../components/container"
import { s } from '../../../utils/s'
import { c } from "../../../utils/c"
import LinearGradient from "react-native-linear-gradient"

// todo: Creating constants object for computed names
export const Setting = ({ navigation }: { navigation: any }) => {
  const [state, setState] = useState({
    'Preferences': false,
    'Security': false,
    'Push notifications': false,
    'Bank Details': false,
    'Help Center': false,
    'About': false,
  })

  const _toggle = (key: string) => {
    Object.keys(state).forEach((item) => {
      setState({ ...state, [item]: false })
    })
    Object.keys(state).forEach((item) => {
      if (item === key) {
        setState({ ...state, [item]: true })
      }
    })
  }

  return (
    <Container className="p-0 bg-[#222943]">
      <Header title={routes.SETTING} navigation={navigation} />
      <View className="flex-1 py-5">
        <View className="space-y-2 px-6 py-2 my-4">
          <FlatList
            className="bg-[#222A47] rounded-xl p-1"
            data={list.slice(0, 3)}
            renderItem={({ item, index }) => <CardItem toggle={_toggle} index={index} card={item} />}
          />
          <FlatList
            className="bg-[#222A47] rounded-xl p-1"
            data={list.slice(-2)}
            renderItem={({ item, index }) => <CardItem toggle={_toggle} index={index} card={item} />}
          />
        </View>
      </View>
      <Portal>
        {Object.entries(state).map((item, index) => {
          return item[1] && (
            <Sheet title="" setIsOpen={() => setState({ ...state, [item[0]]: false })}>
              <View>{list[index]?.component}</View>
            </Sheet>
          )
        })}
      </Portal>
    </Container>
  )
}


interface cardProps {
  title: string,
  image: any,
  component?: JSX.Element,
}
const PersonalInfo = () => <View />
const ChangeEmail = () => <View />
const ChangePassword = () => <View />
const HelpCenter = () => <View />
const About = () => <View />

const list: cardProps[] = [
  {
    title: 'Preferences',
    image: require('../../../assets/options.png'),
    component: <PersonalInfo />
  },
  {
    title: 'Push notifications',
    image: require('../../../assets/notification-bell.png'),
    component: <ChangeEmail />
  },
  {
    title: 'Security',
    image: require('../../../assets/shield-2.png'),
    component: <ChangePassword />
  },
  {
    title: 'Help Center',
    image: require('../../../assets/customer-service.png'),
    component: <HelpCenter />
  },
  {
    title: 'About',
    image: require('../../../assets/information.png'),
    component: <About />
  },

]



const CardItem = ({ card, index, toggle }: { index: number, card: cardProps, toggle: (key: string) => void }): JSX.Element => {
  return (<>
    <TouchableOpacity
      key={index}
      className="p-2 bg-transparent"
      onPress={() => toggle(card.title)}>
      <View className='flex flex-row justify-between items-center'>
        <View className='flex flex-row items-center justify-center space-x-3'>
          <Image source={card.image} className="h-5 w-5" />
          <Text style={s.medium} className="text-light/90 text-[16px] mx-auto mb-1">{card.title}</Text>
        </View>
        <Img src={assets.ChevronRight} size={20} className="opacity-50" />
      </View>
    </TouchableOpacity>
  </>)
}
