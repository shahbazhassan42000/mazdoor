import { StyleSheet, Image, Button, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { IMAGES } from "@/constants/images";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* Mazdoor Full Name Image */}
      <Image style={styles.main_image} source={IMAGES.mazdoor_full_name} />
      {/* Main Text */}
      <View style={styles.textContainer}>
        <Text style={styles.typography1}>
          Be The Fastest{"\n"}In Getting{"\n"}Mazdoor at
        </Text>
        <View style={styles.doorstepWrapper}>
          <Text style={[styles.redFont, styles.typography1]}>DoorStep</Text>
          <View style={styles.circle} />
        </View>
        {/* Login/Signup Button */}
        <TouchableOpacity
          style={[styles.primaryButton, styles.signinBtn]}
          onPress={() => console.log("Login/Signup Pressed")}
        >
          <Text style={[styles.typography2, styles.whiteFont]}>
            Find Mazdoor
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    justifyContent: "center",
  },
  textContainer: {
    marginLeft: 31,
  },
  signinBtn: {
    marginTop: 22,
  },
  primaryButton: {
    display: "flex",
    alignSelf: "flex-start",
    borderRadius: 50,
    paddingVertical: 14,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
  },
  circle: {
    top: 7,
    left: 10,
    width: 10,
    height: 10,
    position: "absolute",
    borderRadius: 50,
    backgroundColor: Colors.secondary,
  },
  doorstepWrapper: {
    position: "relative",
  },
  typography1: {
    zIndex: 2,
    fontSize: 33,
    lineHeight: 48,
    fontWeight: 700,
    fontFamily: "poppins",
  },
  typography2: {
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 22.4,
    fontFamily: "poppins",
  },
  redFont: {
    color: Colors.primary,
  },
  whiteFont: {
    color: Colors.white,
  },
  main_image: {
    width: "85%",
    height: "13%",
    marginTop: 50,
    alignSelf: "center",
    marginBottom: 53,
  },
});
