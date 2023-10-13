import { Text, TouchableOpacity, View } from "react-native"
import { Image } from "react-native"
import Assets from "../../assets"
import { Button } from "../../components/button"
import { Container } from "../../components/container"
import { routes } from "../../constants"
import { s } from '../../utils/s'

export const Create_wallet = ({ navigation }: { navigation: any }) => {

  return (
    <Container className="justify-between py-20">
      <Image className="my-auto" source={{ uri: Assets.Onboarding }} style={{ width: '90%', height: 300, resizeMode: 'contain' }} />
      <View className="space-y-2">
        <Button onPress={() => navigation.navigate(routes.GEN_WALLET)}>Create new wallet</Button>
        <Text style={[s.medium]} className="text-light/70 font-medium text-center">or</Text>

        <TouchableOpacity className="mt-auto" onPress={() => navigation.navigate(routes.IMPORT_WALLET)}>
          <Text style={[s.medium]} className="text-light text-center px-4 rounded-lg w-full">Already have an account</Text>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

/* <View className="flex items-center mx-16 my-5 space-y-1">
        <Text className="text-2xl text-cyan-100">Let's get started</Text>
        <Text className="text-xs text-cyan-100/70 text-center">Securely store and manage your digital assets</Text>
      </View>
 */
