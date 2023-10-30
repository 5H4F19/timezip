import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { s } from '../../utils/s'
import Assets from '../../assets'
import Zip from '../zip'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Files from '../files'

const Tab = createBottomTabNavigator()

interface Itabs {
  key?: any,
  name: string,
  icon: string,
  component: any,
}

const tabs: Itabs[] = [
  {
    name: 'Zip',
    icon: Assets.Minizip,
    component: Zip,
  },
  {
    name: 'Files',
    icon: Assets.Files,
    component: Files,
  },
]

export const BottomTab = () => {

  return (<Tab.Navigator

    screenOptions={
      () => ({
        tabBarStyle: { display: 'none' },
        headerShown: false
      })
    }
    initialRouteName='Wallet'
    tabBar={(props) => <AnimatedTabBar {...props} />}
  >
    {tabs.map((tab, index) => (
      <Tab.Screen
        key={index}
        name={tab.name}
        component={tab.component}
      />

    ))}
  </Tab.Navigator>)
}


const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }: BottomTabBarProps, { title }: BottomTabNavigationOptions) => {
  const { bottom } = useSafeAreaInsets()

  const v1 = ['#00C97F', '#007484']
  const v2 = ['#DD5C9F', '#594099']
  return (
    <View className='w-full' style={{ position: 'absolute', bottom: bottom + 20 }}>
      <LinearGradient colors={activeIndex === 1 ? v2 : v1}
        className="w-10/12 mx-auto flex-row justify-evenly items-center rounded-xl overflow-hidden">
        {tabs?.map((btn, index) => {
          const active = index === activeIndex
          return <>
            <TouchableOpacity
              style={{ opacity: active ? 0.2 : 1 }}
              onPress={() => navigation.navigate(btn.name)}
              className="flex-1 flex-row justify-center items-center py-3" >
              <Image source={{ uri: btn.icon }} className="w-4 h-4" style={{ resizeMode: 'contain' }} />
              <Text style={[s.medium, { fontWeight: '600' }]}
                className="text-center text-[17px] text-[#C8FDFC]">
                {btn.name}
              </Text>
            </TouchableOpacity>
            {index !== tabs.length - 1 && (<View className="w-[1px] h-5 bg-[#C8FDFC]/50" />
            )}
          </>
        })}
      </LinearGradient >
    </View>
  )
}


