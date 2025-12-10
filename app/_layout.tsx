import { Stack } from "expo-router";
import '../assets/styles/global.css';
import { useAuthStore } from "./utils/authStore";

export default function RootLayout() {
  const { isLogin, isOnboarding } = useAuthStore();
  return (
      <Stack>
        <Stack.Protected guard={isLogin}>
          <Stack.Screen name="(drawer)" options={{headerShown:false}}/>
        </Stack.Protected>
        <Stack.Protected guard={!isLogin && isOnboarding}>
          <Stack.Screen name="login" options={{headerShown:false}}/>
          <Stack.Screen name="register" options={{headerTransparent:true, headerTitle:"Back"}}/>
        </Stack.Protected>
        <Stack.Protected guard={!isOnboarding}>
          <Stack.Screen name="onboarding" options={{headerShown:false}}/>
        </Stack.Protected>
      </Stack>
  );
}

