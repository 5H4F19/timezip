import { Image, Text, View } from "react-native"
import { Header } from "../../components"
import { routes } from "../../constants"

export const Profile = ({ navigation }: { navigation: any }) => {
    return (
        <View className="flex-1 bg-primary py-9">
            <Header title={routes.PROFILE} navigation={navigation} />
            <View className="mt-6">
                <View className='border-2 rounded-2xl w-contain mx-auto'>
                    <Image source={{ uri: 'https://picsum.photos/300' }} className="h-24 w-24 rounded-2xl" />
                </View>
                <View className='my-3'>
                    <Text className="text-light text-lg font-['Inter-Medium'] mx-auto">John Doe</Text>
                    <Text className="text-slate-400 text-xs font-['Inter-Medium'] mx-auto">jond@grmail.com</Text>
                </View>
            </View>
        </View>
    )
}