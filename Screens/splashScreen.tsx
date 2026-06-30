import React from 'react'
import {Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect,useState } from 'react'
import{LoginScreen} from "./auth/loginScreen"
import auth from "@react-native-firebase/auth";

const SplashScreen = ({navigation}:any) =>{

  
 useEffect(()=>{

  let isMounted = true;
  const checkUser = async()=>{
    const startTime = Date.now();
    const user = auth().currentUser;
    let nextScreen = "Welcome"
    if(user){
      await user.reload();
      if(user.emailVerified){
        nextScreen = "HomeScreen"
      }
      else{
        await auth().signOut();
        nextScreen = "LoginScreen"
      }
    }
    const elapsed = Date.now()-startTime;
    const remaining = 1500 - elapsed;
    if(remaining>0){
      await new Promise(resolve=> setTimeout(resolve,remaining)
    );
    }
    if (isMounted){
      navigation.replace(nextScreen)
    }
  }
  checkUser()
  return()=>{
    isMounted=false
  }
 },[])
    
    return(

<SafeAreaView className='flex-1'>
    <Image
    source={require("../assets/images/Hiraki.png")}
    style={{width:"100%", height:"100%"}}
    resizeMode='cover'
    />
</SafeAreaView>
    )
}

export default SplashScreen;