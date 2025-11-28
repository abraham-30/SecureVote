import { Image, Text, View } from "react-native";
import CustomTimer from "./timer";

export default function CardSquare(){
    return(
        <View className="flex flex-col bg-gray-200 rounded p-5 gap-2">
            <CustomTimer></CustomTimer>
            <View className="w-full h-48">
                <Image className="w-full h-full object-cover" source={require("../assets/images/icon.png")}></Image>
            </View>
            <View>
                <Text className="text-2xl font-bold">Lorem Ipsum</Text>
                <Text numberOfLines={5} ellipsizeMode="tail" className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus ante at elit consectetur venenatis nec sed metus. Curabitur elementum pulvinar elit nec tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque vitae blandit sapien, porta vehicula mauris.</Text>
            </View>
        </View>
    );
};