import { View, Text } from "react-native";
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "./Screens/index"
import SplashScreen from "./Screens/splashScreen";
import { useEffect, useState } from "react";
import LoginScreen from "./Screens/auth/loginScreen"
import Onboarding from "./Screens/auth/welcome";
import SignUpScreen from "./Screens/auth/signUpScreen";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import BottomTabs from "./BottomsTabs";
import FindRide from "./Screens/FindRide";



const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(()=>{
  GoogleSignin.configure({
  webClientId: "1082258065937-0sugn3tquerdn06r2j6q8clkebq708vm.apps.googleusercontent.com",
    offlineAccess: true,
});
  })

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
    name="SignUpScreen"
    component={SignUpScreen}
    
    />
    <Stack.Screen
  name="LoginScreen"
  component={LoginScreen}
/>
<Stack.Screen
  name="HomeScreen"
  component={BottomTabs}
/>
<Stack.Screen
  name="FindRide"
  component={FindRide}
/>
{/* <Stack.Screen
  name="Confirm-Ride"
  component={ConfirmRide}
/>
<Stack.Screen
  name="Book-Ride"
  component={BookRide}
/> */}
  </Stack.Navigator>
</NavigationContainer>

  )
}