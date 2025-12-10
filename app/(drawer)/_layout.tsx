import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import '../../assets/styles/global.css';

export default function Layout() {

  return (
      <Drawer screenOptions={{
        headerRight: () => 
          <View className='pr-3'>
            <Link href={{pathname: '/notification'}}>
              <MaterialCommunityIcons name="bell" size={24} color="black" />
            </Link>
          </View>
      }}>
        <Drawer.Screen name="(tabs)" options={{title: "Home", headerTitle: ""}}/>
        <Drawer.Screen name="settings" options={{title:"Settings"}}/>
      </Drawer>
  );
}
