import CardNotification from "@/components/card-notification";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function NotificationScreen(){
    return(
        <>
            <Stack.Screen options={{title: "Notification"}}/>
            <View className="p-3">
                <CardNotification></CardNotification>
            </View>
        </>
    );
}