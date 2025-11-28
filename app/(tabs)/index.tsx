import CardRectangular from "@/components/card-rectangular";
import CardSquare from "@/components/card-square";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex flex-col p-7 gap-8">
      <View className="flex gap-2">
        <Text className="text-2xl font-bold">Ends in One Hour</Text>
        <CardRectangular/>
      </View>
      <View className="flex gap-2">
        <Text className="text-2xl font-bold">Created Elections</Text>
        <CardSquare></CardSquare>
      </View>
    </View>
  );
}

