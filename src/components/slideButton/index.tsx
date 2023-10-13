import { Alert, Image, Text } from 'react-native';
import SwipeButton from 'rn-swipe-button';
import Thumb from '../../assets/thumb.png'
import { s } from '../../utils/s'

interface SlideButtonProps {
  title: string,
  onUnlock: () => void
}

export function SlideButton({ title, onUnlock }: SlideButtonProps) {
  return (
    <SwipeButton
      onSwipeSuccess={() => {
        onUnlock();
        Alert.alert("sjdsjdfbskjd")
      }}
      railFillBorderColor="#2C3553"
      railFillBackgroundColor="#2C3553"
      containerStyles={{ borderWidth: 0, borderRadius: 15 }}
      thumbIconStyles={{ borderWidth: 0, borderRadius: 15, backgroundColor: 'transparent' }}
      height={50}
      railBackgroundColor="#2C3553"
      disabledThumbIconBackgroundColor="true"
      thumbIconBackgroundColor="#2C3553"
      //@ts-ignore
      thumbIconComponent={() => (
        <Image source={Thumb} className="h-12 w-16" />
      )}
      titleStyles={{ ...s.medium, color: '#95A4D0', opacity: 0.5, fontSize: 15 }}
      title={title}
    />
  )
}




