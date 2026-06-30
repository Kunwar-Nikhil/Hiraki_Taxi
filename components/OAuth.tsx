import { View,Text,Image } from "react-native"
import CustomButton from "./customButton"

import { icons } from "../constants"
import {GoogleSignin} from "@react-native-google-signin/google-signin"
import  auth  from "@react-native-firebase/auth"
import firestore, { Firestore } from "@react-native-firebase/firestore";




const OAuth=({navigation}:any)=>{
     const onGooglePress = async()=>{
        try{

           console.log("STEP 1");

            await GoogleSignin.hasPlayServices();

             console.log("STEP 2");

            const signInResult = await GoogleSignin.signIn();

            console.log("step 3",signInResult);

          
            const tokens = await GoogleSignin.getTokens()

            console.log("step4");
console.log(tokens);

            if(!tokens.idToken){
                throw new Error("No ID token found")
            }

            const googleCredential = auth.GoogleAuthProvider.credential(tokens.idToken);

             console.log("STEP 5");

            const userCredential = await auth().signInWithCredential(googleCredential);
           
            console.log("STEP 6",userCredential.user.email);
            await firestore()
            .collection("users")
            .doc(userCredential.user.uid)
            .set({
              uid:userCredential.user.uid,
              name:userCredential.user.displayName,
              email:userCredential.user.email,
              phone:userCredential.user.phoneNumber,
              profileimage:userCredential.user.photoURL,
              createdAt: firestore.FieldValue.serverTimestamp(),
            },
          {
            merge:true,
          })
            console.log(userCredential.user.email)
            navigation.replace("HomeScreen")
             console.log("STEP 7");
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