import React from 'react'
import {Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SplashScreen = () =>{
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