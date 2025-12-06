import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, View } from "react-native";

export default function Timer(){
    return (
        <View className="flex flex-row border-2 rounded p-2 gap-2 items-center">
            <MaterialCommunityIcons name="timer-alert" size={24} color="black" />
            <Text>Vote ends in 59:00</Text>
        </View>
    );
};