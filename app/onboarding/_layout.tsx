import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="email-verification"/>
            <Stack.Screen name="email-set"/>
            <Stack.Screen name="face-verification"/>
            <Stack.Screen name="all-set"/>
        </Stack>
    );
}