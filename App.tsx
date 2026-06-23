import { View, Text } from "react-native";
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "./Screens/index"
import SplashScreen from "./Screens/splashScreen";
import { useEffect, useState } from "react";
import LoginScreen from "./Screens/auth/loginScreen"
import Onboarding from "./Screens/auth/welcome";

const Stack = createNativeStackNavigator();

export default function App() {
 
  
  return (

<NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen 
    name="Splash"
    component={SplashScreen}
    />
    <Stack.Screen
    name="Welcome"
    component={Onboarding}
    
    />
    <Stack.Screen
    name="LoginScreen"
    component={LoginScreen}
    
    
    />
  </Stack.Navigator>
</NavigationContainer>

  )
}