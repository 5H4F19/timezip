import { Text, TouchableOpacity, View } from "react-native";
import { s } from '../../utils/s'

export function Numbpad({ amount, setAmount }: { amount: string, setAmount: (b: string) => void }) {
  const nums = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ]
  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount(amount + key);
    }
  };

  return (
    <View className="flex my-3">
      {nums.map((row, rowIndex) => (
        <View className="flex-row" key={rowIndex}>
          {row.map((buttonText, buttonIndex) => (
            <TouchableOpacity
              className="flex-1 p-3"
              key={`${rowIndex}_${buttonIndex}`}
              onPress={() => handleKeyPress(buttonText)}
            >
              <Text
                style={[s.medium]}
                className="text-3xl text-light text-center">{buttonText}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}


