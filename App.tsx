import { View, Text } from "react-native";
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import Home from "./Screens/index"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
    name="Home"
    component={Home}
    />
  </Stack.Navigator>
</NavigationContainer>

  )
}