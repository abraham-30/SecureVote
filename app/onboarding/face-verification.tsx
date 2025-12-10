import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function FaceVerificationScreen(){
    return (
        <View className="flex-1 justify-center items-center">
            <Text>Face Verification</Text>
            <Link asChild push href={'/onboarding/all-set'}>
                <Button title="Next"/>
            </Link>
        </View>
    );
}