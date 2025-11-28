import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import '../assets/styles/global.css';

function RouteGuard({children}:{children: React.ReactNode}){
  const router = useRouter();
  const isAuth = false; // only for testing
  
  useEffect(()=>{
    if(!isAuth){
      router.replace("/auth");
    }
  })

  return <>{children}</>
}

export default function RootLayout() {
  return (
    // <RouteGuard> -> activate ini kalau mau lihat login screen/register screen
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      </Stack>
    // </RouteGuard>
  );
}
