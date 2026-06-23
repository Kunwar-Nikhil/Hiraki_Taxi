import { View,Text,Image } from "react-native"
import CustomButton from "./customButton"

import { icons } from "../constants"




const OAuth=()=>{
    const handleGoogleSignIn=async()=>{}
    return(
    <View>
    <View className="w-full flex-row items-center mt-4">
  <View className="flex-1 h-[1px] bg-gray-300" />
  <Text className="mx-3 text-lg">Or</Text>
  <View className="flex-1 h-[1px] bg-gray-300" />
</View>

<CustomButton
  title="Log In with Google"
  className="mt-5 w-full shadow-none"
  IconLeft={() => (
    <Image
      source={icons.google}
      resizeMode="contain"
      className="w-5 h-5 mx-2"
    />
  )}
  bgVariant="outline"
  textVariant="primary"
  onPress={handleGoogleSignIn}
/>
</View>
)
}
export default OAuth