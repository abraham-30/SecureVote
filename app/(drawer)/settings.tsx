import { Button, Text, View } from "react-native";
import { useAuthStore } from "../utils/authStore";

export default function SettingsScreen(){
    const { logOut } = useAuthStore();
    return(
        <View>
            <Text>Test</Text>
            <Button title="Log Out" onPress={logOut}/>
        </View>
    );
}