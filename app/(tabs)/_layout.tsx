import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";
import '../../assets/styles/global.css';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: 'coral',
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        headerTitle:"Home", 
        tabBarIcon: ({color}) => (<FontAwesome5 name="home" size={20} color={color}/>)
      }}/>
      <Tabs.Screen name="elections" options={{
        title: "Elections",
        headerTitle:"Elections",
        tabBarIcon: ({color}) => (<FontAwesome5 name="vote-yea" size={20} color={color} />)
      }}/>
      <Tabs.Screen name="created-elections" options={{
        title: "Created Elections",
        headerTitle:'Created Elections',
        tabBarIcon: ({color}) => (<FontAwesome5 name="pencil-alt" size={20} color={color} />)
      }}/>
      <Tabs.Screen name="history" options={{
        title: "History",
        headerTitle:'History',
        tabBarIcon: ({color}) => (<FontAwesome5 name="history" size={20} color={color} />)
      }}/>
    </Tabs> 
  );
}
