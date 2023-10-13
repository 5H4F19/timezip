import { Text, TouchableOpacity, View } from "react-native"
import { Header } from "../../../components"
import { routes } from "../../../constants"
import { FlatList } from "react-native"
import { Heading } from "../../../components/heading"
import { Platform } from "react-native"
export const History = ({ navigation }: { navigation: any }) => {
    return (
        <View className="flex-1 bg-primary" style={{ paddingTop: Platform.OS === 'android' ? 42 : 63 }}>
            <Header title={routes.HISTORY} navigation={navigation} />
            <FlatList
                className="mx-5 mt-3"
                data={cards}
                renderItem={({ item, index }) => <CardItem onPress={() => navigation.navigate('Details', { id: index })} index={index} card={item} />}
            />
        </View>
    )
}

export enum Status {
    pending = 'pending',
    completed = 'completed',
    cancelled = 'cancelled',
    all = 'all',
}
enum Type {
    sent = 'Sent',
    receive = 'Receive'
}
enum Coins {
    qpq = 'QPQ',
    XLM = 'XLM'
}
interface CardProps {
    amount: number
    status: Status
    type: Type
    fromOrTo: string
    coin: Coins
}

const cards: CardProps[] = [
    {
        amount: 1000,
        status: Status.completed,
        type: Type.sent,
        coin: Coins.XLM,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'

    },
    {
        amount: 2000,
        status: Status.pending,
        type: Type.receive,
        coin: Coins.qpq,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.cancelled,
        type: Type.sent,
        coin: Coins.XLM,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.completed,
        type: Type.sent,
        coin: Coins.XLM,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.pending,
        type: Type.receive,
        coin: Coins.qpq,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.cancelled,
        type: Type.receive,
        coin: Coins.qpq,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.cancelled,
        type: Type.sent,
        coin: Coins.XLM,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.pending,
        type: Type.receive,
        coin: Coins.XLM,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.completed,
        type: Type.receive,
        coin: Coins.qpq,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.cancelled,
        type: Type.receive,
        coin: Coins.XLM,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
    {
        amount: 3000,
        status: Status.pending,
        type: Type.receive,
        coin: Coins.XLM,
        fromOrTo: '0x7sd39b339bfb483bf39fb3'
    },
]

// export const History = ({ navigation }: { navigation: any }) => {
//     return (
//         <View className="flex-1 bg-white px-5">
//             <View className="border-b py-4 border-black/10">
//                 <Text className="text-black text-md mt-5 mx-auto font-['Inter-Medium'] capitilize">Trade History</Text>
//             </View>
//             <View>
//                 <Text className="text-black font-['Inter-Medium'] my-5">Today</Text>
//             </View>

//         </View>
//     )
// }

const CardItem = ({ card, index, onPress }: { index: number, card: CardProps, onPress: () => void }): JSX.Element => {
    return (<TouchableOpacity key={index} className="flex-row gap-x-2 my-2" onPress={onPress}>
        <View className="flex-1 flex-row justify-between bg-tertiary p-1 rounded-xl">
            <View className="space-y-2 p-2 rounded-xl">
                <Text className="font-['Inter-SemiBold'] text-lg text-light">{card.type}</Text>
                <Text className="font-['Inter-Medium'] text-xs text-light/80">{card.type === Type.receive ? 'From:' : 'To:'} {card.fromOrTo.substring(0, 20) + '...'}</Text>
                <Text className="font-['Inter-Medium'] text-xs text-light/70">12 - 03 - 2020</Text>
            </View>
            <View className="flex items-end p-3 space-y-2">
                {StatusB(card.status)}
                <View className="flex flex-row items-center">
                    <Heading className="bg-primary/50 uppercase text-xs rounded-md px-1.5 py-1">{card.coin}</Heading>
                    <Heading className="text-xs text-light font-['Inter-SemiBold'] px-1">{card.amount}</Heading>
                </View>
            </View>
        </View>
    </TouchableOpacity>)
}


export function StatusB(status: Status) {
    return <View className={`${_status(status).bg} rounded-full`}>
        <Text className={`font-['Inter-Medium'] capitalize text-xs ${_status(status).txt}  px-4 py-2 rounded-2xl`}>{status}</Text>
    </View>
}


export const _status = (status: Status) => {
    switch (status) {
        case Status.pending:
            return { txt: 'text-orange-500', bg: 'bg-orange-50', img: require('../../../assets/pending.png') }
        case Status.completed:
            return { txt: 'text-green-500', bg: 'bg-green-50', img: require('../../../assets/completed.png') }
        case Status.cancelled:
            return { txt: 'text-red-500', bg: 'bg-red-50', img: require('../../../assets/cancelled.png') }
        default:
            return { txt: 'text-orange-500', bg: 'bg-orange-50', img: require('../../../assets/cancelled.png') }
    }
}