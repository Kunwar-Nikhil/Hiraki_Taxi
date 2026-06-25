import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import Home from "./Screens/home"
import Chat from "./Screens/chat"
import Rides from "./Screens/rides"
import Profile from "./Screens/profile"
import { icons } from "./constants"
import { View,Image, ImageSourcePropType, TouchableOpacity } from "react-native"

const Tab = createBottomTabNavigator();

const TabIcon =({source,focused}:{source:ImageSourcePropType , focused:boolean})=>(
    <View className={` justify-center items-center rounded-full ${focused? "bg-blue-500":""}`} style={{width:46,height:46}}>
    
            <Image source={source} tintColor="white" resizeMode="contain"
            style={{width:22 , height:22}}/>

    </View>
)
const BottomTabs =()=>{
    return(
        <Tab.Navigator screenOptions={{headerShown:false,
            tabBarActiveTintColor:"#fff",
            tabBarInactiveTintColor: "#fff",
            tabBarButton:(props)=>(<TouchableOpacity {...props} activeOpacity={1}/>),
            tabBarShowLabel:false,
            tabBarItemStyle:{justifyContent:"center",alignItems:"center"},
            
            tabBarStyle:{
                backgroundColor:"#333333",
                borderTopWidth:0,
                borderRadius:34,
                paddingTop:5,
                paddingBottom:30,
                marginHorizontal:20,
                marginBottom:20,
                height:70,
                display:"flex",
                justifyContent:"space-between",
               alignItems:"center",
                flexDirection:"row",
                position:"absolute"
            }
        }}>
            <Tab.Screen
            name="Home"
            component={Home}
            options={{
                tabBarIcon:({focused})=>(
                <TabIcon focused={focused} source={icons.home}/>
    )}}
            />
            <Tab.Screen
            name="Rides"
            component={Rides}
            options={{
                tabBarIcon:({focused})=>(<TabIcon focused={focused} source={icons.list}/>
    )}}
            />
            <Tab.Screen
            name="Chat"
            component={Chat}
            options={{tabBarIcon:({focused})=>(<TabIcon focused={focused} source={icons.chat}/>)}}
            />
            <Tab.Screen
            name="Profile"
            component={Profile}
            options={{

            tabBarIcon:({focused})=>(<TabIcon focused={focused} source={icons.profile}/>)}}
            />
        </Tab.Navigator>

    )
}
export default BottomTabs;