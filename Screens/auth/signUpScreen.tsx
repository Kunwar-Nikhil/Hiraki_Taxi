import { View,Image, ScrollView, Text, TouchableOpacity, Alert } from "react-native";

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
            await createdUser.user.sendEmailVerification();
            setVerification({
                state:"pending",
                error:"",
                code:"",
            })
              console.log("User Created Sucessfully");
            console.log(createdUser.user.email)
            console.log(createdUser.user.uid)
            
        }
        catch (error) {
            let message = "";
            switch(error.code){
                case "auth/email-already-in-use":
                    message="Email already exists.";
                    break;
                 case "auth/weak-password":
                    message="Password must be at least 6 characters."
                    break
                 case "auth/invalid-email":
                    message="Please enter a valid email."
                    break
                default:
                    message = "Something went wrong."

            }
    setVerification({
        state: "failed",
        error:message,
        code: "",
    });

    console.log(error);
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

<Modal isVisible={verification.state==="pending"}>
    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
        <Text className="text-2xl font-JakartaExtraBold mb-2">Verification</Text>
        <Text className="font-Jakarta mb-5">
            we've sent a verification link to {form.email}
        </Text>
        <TouchableOpacity className="bg-blue-500 py-3 rounded-xl mt-8" onPress={async()=>{
            await auth().currentUser?.reload();
            if(auth().currentUser?.emailVerified){
                setVerification({
                    state:"success",
                    error:"",
                    code:"",
                })
            }else{
                Alert.alert("Email Not Verified","Please verify your email first")
            }
        }}
        >
            <Text className="text-white text-center">
                I have verified my email
            </Text>
        </TouchableOpacity>
    </View>

</Modal>
                    <Modal isVisible={verification.state==="success"}>
                        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5"/>
                            <View className="items-center"><Text>Account Created Sucessfully</Text></View>
                            <TouchableOpacity onPress={()=>{setVerification({state:"default",error:"",code:""});navigation.replace("LoginScreen")}}
                                className=" bg-green-500 py-4 rounded-full  px-8 self-center">
                               
                                <Text className="text-white text-center font-bold text-lg">Continue</Text>
                                
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal isVisible={verification.state==="failed"}>
                    <View className=" bg-white px-7 py-9 rounded-2xl min-h-[250px]">
                    <Text className="text-red-500 text-xl font-bold text-center">
                    Sign Up Failed</Text>
                    <Text className="text-center mt-4 text-gray-600">{verification.error}</Text>
                    <TouchableOpacity onPress={()=>setVerification({state:"default",error:"",code:"",})}
                    className="bg-red-500 py-3 px-8 rounded-xl mt-5 self-center">
                    <Text className="text-white font-bold">OK</Text>
                    </TouchableOpacity>
                    </View>
                    </Modal>


                </View>


            </View>
        </ScrollView>
    )
}
export default SignUpScreen;