import React, { useState } from 'react';
import {
  View, TouchableOpacity, Text, FlatList, Image, Modal, Linking, Share, Alert, StatusBar
} from 'react-native';
import { Container } from './src/components/container';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DirectoryPickerResponse, types, DocumentPickerResponse, pick, pickDirectory } from 'react-native-document-picker'
import { Button } from './src/components/button';
import { NativeModules } from 'react-native';
import { Br } from './src/components/br';
import { BottomTab } from './src/screens/bottomTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import { NavigationContainer } from '@react-navigation/native';


const { ArchivingModule } = NativeModules


const ZipApp = () => {

  const [files, setFiles] = useState<DocumentPickerResponse[]>()
  const [uri, setUri] = useState<DirectoryPickerResponse>()
  const [zipped, setZipped] = useState<string[]>()
  const [visible, setVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>()

  const pickFile = async () => {
    try {
      const doc = await pick({
        type: [types.allFiles]
      })
      setFiles(doc)

      doc.map(async d => {
        if (d.uri) {
          ArchivingModule.Zip(d.name, d.uri, (path: string) => {
            console.log(path)
          })
        } else throw Error(d.uri)
      }
      )
    } catch (e) {

    }
  }

  const pickFolder = async () => {
    try {
      const doc = await pickDirectory()
      if (doc) setUri(doc)
    } catch (error) {
      console.log(error)
    }
  }


  const unzip = (s: string) => {
    ArchivingModule.Unzip(s, (path: string) => {
      console.log("Path returned from unzip method", path)
    })
  }

  const handleFileManager = async () => {
    try {
      console.log(selected)
      if (selected) await Linking.openURL(selected)
    } catch (error) {
      console.error(error)
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error?.message);
    }
  };

  return (
    <SafeAreaProvider>
      <Container>
        <Text>{files?.[0]?.uri}</Text>
        <Text>{JSON.stringify(uri)}</Text>
        <View className='flex-row items-center justify-center'>
          <Button onPress={pickFile}>
            Pick a file
          </Button>
          <Button onPress={pickFolder}>
            Pick a folder
          </Button>
          <Button onPress={() => { }}>
            List
          </Button>
        </View>
        <View>
          <FlatList
            numColumns={2}
            data={zipped}
            renderItem={({ item }) => <FileView name={item} onLongPress={() => { setSelected(item); setVisible(true) }} />}
          />
        </View>
      </Container>
      <Modal visible={visible} transparent>
        <Container className='bg-bg/90 backdrop-blur-lg'>
          <View className='my-auto mx-auto w-8/12 bg-[#1C2128] rounded-xl border border-[#444C56]'>
            <TouchableOpacity onPress={() => { setVisible(false); unzip(selected!) }} className='p-4'>
              <Text className='text-txt'>Unzip</Text>
            </TouchableOpacity>
            <Br />
            <TouchableOpacity onPress={() => { setVisible(false); handleFileManager() }} className='p-4'>
              <Text className='text-txt'>Open in folder</Text>
            </TouchableOpacity>
            <Br />
            <TouchableOpacity onPress={async () => { setVisible(false); await onShare() }} className='p-4'>
              <Text className='text-txt'>Share</Text>
            </TouchableOpacity>
            <Br />
            <TouchableOpacity onPress={() => { setVisible(false) }} className='p-4'>
              <Text className='text-txt'>Close</Text>
            </TouchableOpacity>
          </View>
        </Container>
      </Modal>
    </SafeAreaProvider>
  )
  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <PortalProvider>
  //       <View className='flex-1 bg-[#1A222D]'>
  //         <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
  //         <NavigationContainer>
  //           <Stack.Navigator initialRouteName={routes.ONBOARDING}>
  //             {Routes.map(item => {
  //               return (<Stack.Screen key={item.path} name={item.path} component={item.component} options={{ dddaderShown: false }} />)
  //             })}
  //           </Stack.Navigator>
  //         </NavigationContainer>
  //       </View>
  //     </PortalProvider>

  //   </GestureHandlerRootView>
  // )
}


const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalProvider>
          <View className='flex-1 bg-[#1A222D]'>
            <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
            <NavigationContainer>
              <BottomTab />
            </NavigationContainer>
          </View>
        </PortalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>

  )
}
export default App;
