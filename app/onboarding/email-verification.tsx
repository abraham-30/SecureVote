import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function EmailVerificationScreen(){
    return (
        <View className="flex-1 p-16 justify-center items-center">
            <View>
                <Text className="text-2xl font-bold" >Please check your email!</Text>
            </View>
            <View className="pt-3">
                <Text className="text-center">We have send a one time password (OTP) to your email to verify your email</Text>
            </View>
            <View className="pt-5 w-full">
                <Link asChild push href={"/onboarding/email-set"}>
                    <Button title="Submit"/>
                </Link>
            </View>
        </View>
    );
}