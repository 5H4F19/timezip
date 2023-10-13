import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  StatusBar, View, Button
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { routes } from './src/constants';
import { Routes } from './src/screens';

const Stack = createNativeStackNavigator()

const App = () => {

  // useEffect(() => {
  //   SplashScreen.hide();
  // })
  return (
    <View>
      <Button title='Pick a file or folder' />
    </View>
  )
  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <PortalProvider>
  //       <View className='flex-1 bg-[#1A222D]'>
  //         <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
  //         <NavigationContainer>
  //           <Stack.Navigator initialRouteName={routes.ONBOARDING}>
  //             {Routes.map(item => {
  //               return (<Stack.Screen key={item.path} name={item.path} component={item.component} options={{ headerShown: false }} />)
  //             })}
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       </View>
  //     </PortalProvider>

  //   </GestureHandlerRootView>
  // )
}

export default App;
