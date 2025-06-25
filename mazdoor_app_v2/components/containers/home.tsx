// Native Imports
import { StyleSheet, Image, TouchableOpacity, View, Text } from "react-native";
// 3rd Party Imports
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
// Alias Imports
import Colors from "@/constants/Colors";
import { IMAGES } from "@/constants/images";

const Home = () => {
  const { t } = useTranslation();

  const handleJoinPress = () => {
    router.push("/signup");
  };

  const handleLoginPress = () => {
    console.log("Login");
  };

  return (
    <>
      {/* Mazdoor Full Name Image */}
      <Image style={styles.main_image} source={IMAGES.mazdoor_full_name} />
      {/* Main Text */}
      <View style={styles.textContainer}>
        <Text style={styles.typography1}>
          {t("be_the_fastest")}
          {"\n"}
          {t("in_getting")}
          {"\n"}
          {t("mazdoor_at")}
        </Text>
        <View style={styles.doorstepWrapper}>
          <Text style={[styles.primaryFont, styles.typography1]}>
            {t("doorstep")}
          </Text>
          <View style={styles.circle} />
        </View>
        {/* Login/Signup Button */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, styles.signinBtn]}
            onPress={handleLoginPress}
          >
            <Text style={[styles.typography2, styles.whiteFont]}>
              {t("login")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, styles.signinBtn]}
            onPress={handleJoinPress}
          >
            <Text style={[styles.typography2, styles.blackFont]}>
              {t("join")}
            </Text>
          </TouchableOpacity>
        </View>

        <Image source={IMAGES.labor1} style={styles.labor1} />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  labor1: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    top: 100,
  },
  textContainer: {
    marginLeft: 31,
    position: "relative",
    zIndex: 2,
  },
  signinBtn: {
    marginTop: 22,
    zIndex: 2,
  },
  buttonsContainer: {
    gap: 20,
    flexDirection: "row",
  },
  button: {
    display: "flex",
    alignSelf: "flex-start",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
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
  primaryFont: {
    color: Colors.primary,
  },
  whiteFont: {
    color: Colors.white,
  },
  blackFont: {
    color: Colors.text,
  },
  main_image: {
    width: "80%",
    height: 52,
    marginTop: 60,
    alignSelf: "center",
    marginBottom: 53,
  },
});
