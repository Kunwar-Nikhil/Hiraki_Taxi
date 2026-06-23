import React from 'react'
import {Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect,useState } from 'react'
import{LoginScreen} from "./auth/loginScreen"

const SplashScreen = ({navigation}:any) =>{

  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      navigation.replace("Welcome")

    },1500)
    return ()=> clearTimeout(timer);
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