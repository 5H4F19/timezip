import { TouchableOpacity } from "react-native"
import { Img } from "../img"

interface BtnIconProps {
    onPress: () => void
    uri: string
}
export const BtnIcon = ({ onPress, uri }: BtnIconProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Img src={uri} />
        </TouchableOpacity>
    )
}

