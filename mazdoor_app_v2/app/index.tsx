// Native Imports
import { ScrollView, StyleSheet } from "react-native";
// Alias Imports
import Colors from "@/constants/Colors";
import {
  Home,
  Hero,
  AboutUs,
  Services,
  TeamCarousel,
  LaborCarousel,
  Footer,
} from "@/components/containers";

const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Home />
      <Services />
      <LaborCarousel />
      <TeamCarousel />
      <AboutUs />
      <Hero />
      <Footer />
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
