// Native Imports
import { StyleSheet } from "react-native";
// Alias Imports
import Home from "@/components/containers/home";
import { View } from "@/components/Themed";
import Services from "@/components/containers/services";

const Index = () => {
  return (
    <View style={styles.container}>
      <Home />
      <Services />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    justifyContent: "center",
  },
});
