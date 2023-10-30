import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { c } from "../../utils/c"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Container = ({ children, className, v2 }: { className?: string, v2?: boolean, children: JSX.Element | JSX.Element[] }) => {
  const insets = useSafeAreaInsets()
  const firstColor = v2 ? '#9D6BC6' : '#00A990'
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      className="w-full h-full px-9" colors={[firstColor, '#313869']}>
      <View
        className={c(className!, "flex-1 bg-transparent", className!)}
        style={{ paddingTop: insets.top + 30 }}>
        {children}
      </View>
    </LinearGradient>
  )
}
