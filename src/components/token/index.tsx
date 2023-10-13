import { Image, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"

export const Tokens = ({ data }: { data: any }) => {
    return (
        <FlatList
            className="px-5 pb-5"
            data={data}
            renderItem={({ item, index }) => <Token key={item.name} item={item} navigation={() => { }} />}
        />
    )
}


export function Token({ item, navigation }: { item: any, navigation: any }): JSX.Element {
    return (
        <TouchableOpacity className="flex flex-row items-center my-3" onPress={navigation}>
            <View className="flex flex-row gap-x-6">
                <Image source={{ uri: item.url }} style={{ width: 45, height: 45 }} />
                <View className="flex justify-center">
                    <Text className={`text-[18px] font-['Inter-SemiBold'] text-[#B7D4FE]`}>{item.symbol} <Text className="text-[10px]">{item.blockchain}</Text></Text>
                    <Text className={`text-[12px] font-['Inter-SemiBold'] capitalize text-[#B7D4FE]/50`}>{item.name}</Text>
                </View>
            </View>
            <View className="ml-auto">
                <Text className={`text-[14px] font-['Inter-SemiBold'] text-[#B7D4FE]`}>0 {item.symbol}</Text>
            </View>
        </TouchableOpacity>
    )
}
