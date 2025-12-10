import { Button, Image, Text, View } from "react-native";
import { useAuthStore } from "../utils/authStore";

export default function AllSetScreen(){
    const { completeOnboarding } = useAuthStore();

    return(
        <View className="flex-1 p-16 justify-center items-center">
            <View>
                <Text className="text-2xl font-bold" >All Set!</Text>
            </View>
            <View className="pt-10">
                <Image className="" source={require("../../assets/images/undraw_verified.png")}/>
            </View>
            <View className="pt-10">
                <Text className="text-center">Now you can start to cast your vote</Text>
            </View>
            <View className="pt-10 w-full">
                <Button title="Nice!" onPress={completeOnboarding}/>
            </View>
        </View>
    );
}