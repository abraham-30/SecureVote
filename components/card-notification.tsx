import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, View } from "react-native";

export default function CardNotification(){
    return (
        <View className='flex-row items-center bg-gray-200 p-5 gap-2 rounded'>
            <MaterialCommunityIcons name="alert-circle" size={24} color="black" />
            <Text>Lorem ipsum dolor sit amet</Text>
        </View>
    );
}