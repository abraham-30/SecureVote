import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import { TouchableOpacity } from "react-native";
import '../../assets/styles/global.css';

export default function Layout() {
  return (
      <Drawer>
        <Drawer.Screen name="(tabs)" options={{
          title: "E-Vote",
          headerRight: () => (
          <TouchableOpacity onPress={() => router.push("/notification")}>
            <FontAwesome5 name="bell" size={24} color="black" />
          </TouchableOpacity>
        )
        }}/>
        <Drawer.Screen name="settings" options={{title:"Settings"}}/>
      </Drawer>
  );
}
