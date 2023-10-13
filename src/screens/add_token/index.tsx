import { Text, View } from "react-native"
import { Header } from "../../components"
import { routes } from "../../constants"

export const Add_token = ({ navigation }: { navigation: any }) => {
    return (
        <View className="flex-1 bg-primary py-9">
            <Header title={routes.ADD_TOKEN} navigation={navigation} />
        </View>
    )
}