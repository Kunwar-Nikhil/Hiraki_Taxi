import { View,Image, ScrollView, Text, TouchableOpacity } from "react-native";

import { icons, images } from "../../constants";
import InputField from "../../components/InputField";
import { useState } from "react";
import CustomButton from "../../components/customButton";
import OAuth from "../../components/OAuth";
import auth from "@react-native-firebase/auth"
import Modal from "react-native-modal"


const SignUpScreen =({navigation}) => {

    const [form,setForm]=useState({
        name:"",
        email:"",
        password:""
    })

    const [verification,setVerification]=useState({
        state: "default",
        error: "",
        code: "",
    })
      console.log("Verification State:", verification.state);

    const onSignUpPress =async()=>{
        try{
            const createdUser = await auth().createUserWithEmailAndPassword(
                form.email,
                form.password
            )
            setVerification({
                state:"success",
                error:"",
                code:"",
            })
              console.log("Verification State:", verification.state);
            console.log(createdUser.user.email)
            console.log(createdUser.user.uid)
            
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image
                    source={images.signUpCar} className="z-0 w-full h-[250px]"/>
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Create your Account</Text>
                </View>
                <View className="p-5">
                    <InputField label="Name"
                    placeholder="Enter your name"
                    icon={icons.person}
                    value={form.name}
                    onChangeText={(value)=>
                        setForm({...form, name:value})
                    } />

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

                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6 mb-6" />



                    {/* OAuth */}
                    <OAuth navigation={navigation}/>

                    <View className="  flex-row justify-center items-center mt-4">
                      <Text className="text-lg text-general-200">Already have an account? </Text>
                    
                    <TouchableOpacity onPress={()=>navigation.navigate("LoginScreen")}>
                    <Text className="text-primary-500">Log In</Text>
                    </TouchableOpacity>
                    </View>

                    <Modal isVisible={verification.state==="success"}>
                        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5"/>
                            <View className="items-center"><Text>Account Created Sucessfully</Text></View>
                            <TouchableOpacity onPress={()=>{navigation.replace("LoginScreen")}}
                                className=" bg-green-500 py-4 rounded-full  px-8 self-center">
                               
                                <Text className="text-white text-center font-bold text-lg">Continue</Text>
                                
                            </TouchableOpacity>
                        </View>
                    </Modal>


                </View>


            </View>
        </ScrollView>
    )
}
export default SignUpScreen;