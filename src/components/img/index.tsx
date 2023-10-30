import { Image, ImageSourcePropType } from "react-native"

export const Img = ({ src, size = 25, className }: { src: string, size?: number, className?: string }) => {
  return (
    <Image className={className} source={{ uri: src }} style={{ resizeMode: 'contain', width: size, height: size, tintColor: '#B7D4FE' }} />
  )
}
