import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function OnboardingScreenA(){
    return (
        <View className="flex-1 justify-center items-center">
            <Text>Onboarding A</Text>
            <Link asChild push href={'/onboarding/onboarding-b'}>
                <Button title="Go to Onboarding B"/>
            </Link>
        </View>
    );
}