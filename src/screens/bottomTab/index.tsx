import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  Image,
} from 'react-native'
// navigation
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Wallet } from './wallet'
import { s } from '../../utils/s'
import { Notification } from '../notification'
import Assets from '../../assets'
const Tab = createBottomTabNavigator()


// ------------------------------------------------------------------
interface Itabs {
  name: string,
  icon: string,
  component: any,

}

const tabs: Itabs[] = [
  {
    name: 'Wallet',
    icon: Assets.Wallet,
    component: Wallet,
  },
  {
    name: 'Notification',
    icon: Assets.Notification,
    component: Notification,
  },
]

export const BottomTab = () => {

  return (<Tab.Navigator

    screenOptions={
      ({ route }) => ({
        headerShown: false
      })
    }
    initialRouteName='Wallet'
  >
    {tabs.map((tab, index) => (
      <Tab.Screen
        key={index}
        name={tab.name}
        options={{
          tabBarIcon: ({ focused }) => {
            // @ts-ignore
            return (<View className={`px-5 py-[5px] rounded-full`}><Image source={{ uri: tab.icon }} className="h-5 w-5" style={{ resizeMode: 'contain', tintColor: focused ? '#B7D4FE' : '#6B7C8F' }} /></View>)
          },
          tabBarStyle: styles.tabBarStyle,
          tabBarLabel: ({ focused }) => {
            return <Text style={[s.medium]} className={`text-[12px] font-['Inter-SemiBold'] capitalize ${focused ? 'text-[#B7D4FE]' : 'text-[#6B7C8F]'} `}>{tab.name}</Text>
          },
        }}
        component={tab.component}
      />

    ))}
  </Tab.Navigator>)
}



const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'red',
  },
  tabBarStyle: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 6,
    height: 70,
    borderTopWidth: 0,
    backgroundColor: '#2B3452',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 50,
    width: 50,
    marginBottom: -5,
    elevation: 3,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
