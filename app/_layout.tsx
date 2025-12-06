import { Stack } from "expo-router";
import '../assets/styles/global.css';

const isLoggedIn = false;
const isOnboarding = false;

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(drawer)" options={{headerShown:false}}/>
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" options={{headerShown:false}}/>
          <Stack.Screen name="register" options={{headerTransparent:true, headerTitle:"Back"}}/>
          <Stack.Protected guard={!isOnboarding}>
            <Stack.Screen name="onboarding" options={{headerShown:false}}/>
          </Stack.Protected>
        </Stack.Protected>
      </Stack>
  );
}

