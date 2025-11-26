import { useState } from "react";
import { Button, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";

export default function AuthScreen(){
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View>
                <View>
                    <Text>E-VOTE | E-VOTE</Text>
                    <Text>{isRegistered ? "Welcome Back!" : "Hi!"}</Text>
                    <Text>{isRegistered ? "Please fill out your e-vote credential" : "Please fill out the registration form"}</Text>
                </View>
                <TextInput 
                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white text-gray-700"
                autoCapitalize="none" 
                keyboardType="email-address"
                placeholder="example@org.com"
                />
                <TextInput 
                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white text-gray-700"
                autoCapitalize="none" 
                keyboardType="default"
                />
                <TextInput 
                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white text-gray-700"
                autoCapitalize="none" 
                keyboardType="visible-password"
                />
                <Button title="Login"/>
                <Text>Don't have an account?</Text>
                {/* <Link href={}>Register Here</Link> */}
            </View>
        </KeyboardAvoidingView>
    );
}