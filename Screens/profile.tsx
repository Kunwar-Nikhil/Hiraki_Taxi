import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth"
import { Alert } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import CustomButton from "../components/customButton";
const Profile = ({navigation}:any) => {
    const handleLogout = ()=>{

    console.log("Logout button pressed");
        Alert.alert("Logout",
            "Are you sure you want to logout?",
            [
                {
                    text:"Cancel",
                    style: "cancel",
                },
            {
                text:"Logout",
                onPress:async()=>{
                    try{
                        if(await GoogleSignin.hasPreviousSignIn()){                        await GoogleSignin.signOut();

                        
                        }
                        await auth().signOut();

                        navigation.getParent()?.reset({
                            index:0,
                            routes:[{name:"Welcome"}]
                        })
                    }catch(error){
                        console.log(error)
                    }
                }
            }
            ]
        )
    }
return(
    <SafeAreaView>
        <Text>
            Profile
        </Text>
        <CustomButton
    title="Logout"
    onPress={handleLogout}
    bgVariant="danger"
    className="mt-5"
/>
    </SafeAreaView>
)
}
export default Profile;