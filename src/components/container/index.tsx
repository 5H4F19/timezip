import { View, Platform, StatusBar } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { SafeAreaInsetsContext } from "react-native-safe-area-context"
import { c } from "../../utils/c"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Container = ({ children, className }: { className?: string, children: JSX.Element | JSX.Element[] }) => {
  const insets = useSafeAreaInsets()
  return (
    <LinearGradient
      colors={['#2D3654', '#181B33']}
      className={c(className!, "flex-1 px-9", className!)}
      style={{ paddingTop: insets.top + 30 }}>
      {children}
    </LinearGradient>
  )
}
