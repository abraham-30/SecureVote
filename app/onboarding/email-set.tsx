import { Link } from "expo-router";
import { Button, Image, Text, View } from "react-native";

export default function EmailSetScreen(){
    return (
        <View className="flex-1 p-16 justify-center items-center">
            <View>
                <Text className="text-2xl font-bold" >Almost There!</Text>
            </View>
            <View className="pt-10">
                <Image className="" source={require("../../assets/images/undraw-email-onboard.png")}/>
            </View>
            <View className="pt-10">
                <Text className="text-center text-lg font-bold">Email verified!</Text>
                <Text className="text-center">Before you can cast your vote, let us verify your face for authorization purpose</Text>
            </View>
            <View className="pt-10 w-full">
                <Link asChild push href={'/onboarding/face-verification'}>
                    <Button title="Let's Go"/>
                </Link>
            </View>
        </View>
    );
}