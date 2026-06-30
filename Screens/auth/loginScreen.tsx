import { View,Image, ScrollView, Text, TouchableOpacity, Alert } from "react-native";

import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import { useState } from "react";
import CustomButton from "../../components/customButton";
import OAuth from "../../components/OAuth";
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore from "@react-native-firebase/firestore"

const LoginScreen =({navigation}) => {



    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    })

   
    

    const onSignInPress =async()=>{
        try{
            const userCredential = await auth().signInWithEmailAndPassword(
                form.email,
                form.password
            )
            await userCredential.user.reload();
           if(!userCredential.user.emailVerified){
            Alert.alert("Not Verified",
                "Verify your email first"
            )
            await auth().signOut();
            return;
           }
         await firestore().collection("users").doc(userCredential.user.uid).set({
            lastLogin:firestore.FieldValue.serverTimestamp()
         },{
            merge:true,
         })
           
            navigation.replace("HomeScreen")
        } catch (error){
            console.log(error);
        }
    }
    return(
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image
                    source={images.signUpCar} className="z-0 w-full h-[250px]"/>
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Welcome!</Text>
                </View>
                <View className="p-5">
                   
                    <InputField label="Email"
                    placeholder="Enter your email"
                    icon={icons.email}
                    value={form.email}
                    onChangeText={(value)=>
                        setForm({...form, email:value})
                    } />

                    <InputField label="Password"
                    placeholder="Enter your password"
                    icon={icons.lock}
                    value={form.password}
                    secureTextEntry={true}
                    onChangeText={(value)=>
                        setForm({...form, password:value})
                    } />

                    <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6 mb-6" />

                    {/* OAuth */}
                    <OAuth navigation={navigation}/>

                    <View className="  flex-row justify-center items-center mt-4">
                      <Text className="text-lg text-general-200">Don't have an account? </Text>
                    
                    <TouchableOpacity onPress={()=>navigation.navigate("SignUpScreen")}>
                    <Text className="text-primary-500">Sign Up</Text>
                    </TouchableOpacity>
                    </View>

                    {/*Verification*/}


                </View>


            </View>
        </ScrollView>
    )
}
export default LoginScreen;