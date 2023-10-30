import { View, TouchableOpacity, Image, NativeModules, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Img } from '../../components/img'
import assets from '../../assets'
import { Container } from '../../components/container'
import ZipBtn from '../../assets/zip.png'
import { DocumentPickerResponse, pick, types } from 'react-native-document-picker'
import { c } from '../../utils/c'
const { ArchivingModule } = NativeModules

const Zip = () => {
  const [files, setFiles] = useState<DocumentPickerResponse[]>()
  const [loading, setLoading] = useState<boolean>(false)

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
  return (
    <Container className='flex-1 items-center justify-center'>
      <TouchableOpacity className={c(loading ? "opacity-50" : "opacity-100")} disabled={loading} onPress={async () => {
        setLoading(true)
        await pickFile()
        setLoading(false)
      }}>
        <Image source={ZipBtn} style={{ aspectRatio: 1 }} className="w-64 h-64 object-contain" />
      </TouchableOpacity>
      <View className='flex items-center justify-center my-3'>
        <ActivityIndicator className={c(loading ? "opacity-100" : "opacity-0")} size={30} />
      </View>
    </Container>
  )
}

export default Zip
