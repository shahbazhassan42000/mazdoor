// Native Imports
import { ScrollView, StyleSheet } from "react-native";
// Alias Imports
import Home from "@/components/containers/home";
import Colors from "@/constants/Colors";
import Services from "@/components/containers/services";
import LaborCarousel from "@/components/containers/labor_carousal";

const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Home />
      <Services />
      <LaborCarousel />
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
});
