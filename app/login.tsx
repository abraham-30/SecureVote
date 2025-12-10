import { Link } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";
import { useAuthStore } from "./utils/authStore";

export default function LoginScreen(){
    const { logIn } = useAuthStore();
    return (
        <View className="flex-1 justify-center">
            <View className="p-10">
                <View className="flex items-center">
                    <Text className="font-bold text-3xl">E-Vote</Text>
                </View>
                <View className="mt-4">
                    <Text className="font-bold text-2xl">Welcome Back!</Text>
                    <Text>Please fill out your E-Vote credential</Text>
                </View>
                <View className="my-7">
                    <View>
                        <Text>Email</Text>
                        <TextInput className="border rounded-lg my-3" keyboardType="email-address"></TextInput>
                    </View>
                    <View>
                        <Text>Username</Text>
                        <TextInput className="border rounded-lg my-3" keyboardType="default"></TextInput>
                    </View>
                    <View>
                        <Text>Password</Text>
                        <TextInput className="border rounded-lg my-3" keyboardType="visible-password"></TextInput>
                    </View>
                    <View className="mt-7">
                        <Button title="Login" onPress={logIn}/>
                    </View>
                </View>
                <View className="flex items-center">
                    <Text>Don't have an account?</Text>
                    <Link asChild push href={'/register'}>
                        <Text className="underline font-bold">Register here</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}