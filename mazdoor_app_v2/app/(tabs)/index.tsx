import { StyleSheet, Image } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { IMAGES } from "@/constants/images";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.mazdoor_full_name} />
      <Text style={styles.title}>Tab One !!! acv abc avc:: kadpp</Text>
      <Text style={styles.title}>Properties: ac</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
