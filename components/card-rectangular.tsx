import { Text, View } from "react-native";
import Timer from "./timer";

export default function CardRectangular(){
    return (
        <View className="bg-gray-200 rounded p-5 gap-2">
            <Timer/>
            <View>
                <Text className="text-xl font-bold">Lorem Ipsum</Text>
                <Text numberOfLines={3} ellipsizeMode="tail" className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus ante at elit consectetur venenatis nec sed metus. Curabitur elementum pulvinar elit nec tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque vitae blandit sapien, porta vehicula mauris.</Text>
            </View>
        </View>
    );
};
