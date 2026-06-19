import { View, Text } from "react-native";
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "./Screens/index"
import SplashScreen from "./Screens/splashScreen";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [showSplash,setShowSplash] = useState(true);
  
  useEffect(()=>{g
    const timer = setTimeout(()=>{
      setShowSplash(false);
    },1500)
    return ()=> clearTimeout(timer);
  },[])

  if (showSplash){
    return <SplashScreen/>
  }
  
  return (

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
    name="Home"
    component={Home}
    options={{headerShown:false}}
    />
  </Stack.Navigator>
</NavigationContainer>

  )
}