import { View,Text,Image } from "react-native"
import CustomButton from "./customButton"

import { icons } from "../constants"
import {GoogleSignin} from "@react-native-google-signin/google-signin"
import  auth  from "@react-native-firebase/auth"




const OAuth=()=>{
     const onGooglePress = async()=>{
        try{
            await GoogleSignin.hasPlayServices();

             console.log("STEP 1");
            const signInResult = await GoogleSignin.signIn();
            console.log("SIGN IN RESULT");

            console.log("SIGN IN RESULT:", JSON.stringify(signInResult, null, 2))

            const tokens = await GoogleSignin.getTokens()
            console.log("TOKENS");
console.log(tokens);

            if(!tokens.idToken){
                throw new Error("No ID token found")
            }

            const googleCredential = auth.GoogleAuthProvider.credential(tokens.idToken);

            const userCredential = await auth().signInWithCredential(googleCredential);
            console.log(userCredential.user.email)
            navigation.replace("HomeScreen")
        } catch (error){
                console.log("ERROR CODE:", error.code);
    console.log("ERROR MESSAGE:", error.message);
    console.log(error);
        }
    }

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
  onPress={onGooglePress}
/>
</View>
)
}
export default OAuth;