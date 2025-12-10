import { Link } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";

export default function RegisterScreen(){
    return (
        <View className="flex-1 justify-center">
            <View className="p-10">
                <View className="flex items-center">
                    <Text className="font-bold text-3xl">E-Vote</Text>
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-2xl">Hi!</Text>
                    <Text>Please fill out the registration form</Text>
                </View>
                <View className="my-7">
                    <View>
                        <Text>Email</Text>
                        <TextInput className="border rounded-lg my-3" keyboardType="email-address"></TextInput>
                        <Text>Please fill out valid email.</Text>
                    </View>
                    <View className="mt-4">
                        <Text>Username</Text>
                        <TextInput className="border rounded-lg my-3" keyboardType="default"></TextInput>
                        <Text>Username length must be in between 8-20 characters.</Text>
                    </View>
                    <View className="mt-4">
                        <Text>Password</Text>
                        <TextInput className="border rounded-lg my-3" keyboardType="visible-password"></TextInput>
                        <Text>(kasi keterangan disini kalau butuh password mengandung regex)</Text>
                    </View>
                    <View className="mt-7">
                        <Link asChild push href={"/onboarding/email-verification"}>
                            <Button title="Next"/>
                        </Link>
                    </View>
                </View>
            </View>
        </View>
    );
}