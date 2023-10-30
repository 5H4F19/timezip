import { View, Text, NativeModules, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Container } from '../../components/container'
import { truncateTitle } from '../../utils/truncate'
import assets from '../../assets'
import { s } from '../../utils/s'
const { ArchivingModule } = NativeModules



const Files = () => {
  const [zipped, setZipped] = useState<string[]>()
  const listFiles = () => {
    try {
      ArchivingModule.allFiles((res: any) => {
        console.log(res)
        setZipped(res)
      })
    } catch (error) {

    }
  }

  return (
    <Container v2>
      <View className='flex pb-4 mx-auto w-full flex-row items-center justify-between'>
        <Text className='ml-3 text-2xl text-white' style={[s.regular]}>Files</Text>
        <TouchableOpacity onPress={listFiles}>
          <Image source={{ uri: assets.Filter }} style={{ tintColor: '#C8FDFD' }} className="w-5 h-5" />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          numColumns={2}
          data={zipped}
          renderItem={({ item }) => <FileView key={item} name={item}
            onLongPress={() => { }} />}
        />
        <Text>{JSON.stringify(zipped)}</Text>
      </View>
    </Container>
  )
}

export default Files

const FileView = ({ name, onLongPress }: { name: String, onLongPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onLongPress}
      className='flex w-[46%] p-5 space-y-2 items-center bg-black/10  rounded-lg m-2'>
      <Image className='ml-2' source={{ uri: assets.Files }} style={{ resizeMode: 'contain', width: 100, height: 100 }} />
      <Text className='text-txt'>{truncateTitle(name.substring(59))}</Text>
    </TouchableOpacity>

  )
}


