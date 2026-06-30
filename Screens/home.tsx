import {
  Text,
  FlatList,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "../components/RideCard";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { icons, images } from "../constants";
import { useEffect, useState } from "react";
import GoogleTextInput from "../components/GoogleTextInput";
import Map from "../components/Map";

const recentRides = [
  // ....... same data
];

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignOut = () => {};

  const handleDestinationPress = ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {};

  useEffect(() => {
    const fetchUser = async () => {
      const uid = auth().currentUser?.uid;

      if (!uid) {
        setLoading(false);
        return;
      }

      const snapShot = await firestore()
        .collection("users")
        .doc(uid)
        .get();

      if (snapShot.exists) {
        setUser(snapShot.data());
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item) => item.ride_id}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-xl capitalize font-JakartaExtraBold">
                Welcome {user?.first_name || user?.name}
              </Text>

              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 bg-white rounded-full"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Your Current Location
            </Text>

            <View className="flex flex-row items-center bg-transparent h-[300px]">
              <Map />
            </View>

            <Text className="text-xl font-JakartaBold mt-5 mb-5">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;