import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function OnboardingScreenB(){
    return (
        <View className="flex-1 justify-center items-center">
            <Text>Onboarding B</Text>
            <Link asChild push href={'/onboarding/onboarding-c'}>
                <Button title="Go to Onboarding C"/>
            </Link>
        </View>
    );
}