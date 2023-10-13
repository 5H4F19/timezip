import { Text, View } from "react-native"

export const Heading = ({ children, className, textStyle }: { children: any, className?: string, textStyle?: string }) => {
    return (
        <View className={`font-['Inter-Medium'] ${className}`}><Text className={`text-light text-xs ${textStyle}`}>{children}</Text></View>
    )
}