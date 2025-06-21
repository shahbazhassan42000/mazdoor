// Native Imports
import { ScrollView, StyleSheet } from "react-native";
// Alias Imports
import Colors from "@/constants/Colors";
import { Home, Services, LaborCarousel } from "@/components/containers";

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
