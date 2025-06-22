// Native Imports
import React, { FC, useState } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  Pressable,
  StyleSheet,
} from "react-native";
// Alias Imports
import { Admin } from "@/models/interfaces";
import Colors from "@/constants/Colors";

type Props = {
  member: Admin;
};

const TeamCard: FC<Props> = ({ member }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={() => Linking.openURL(member.linkedin)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={styles.outerBorder}>
        <View style={styles.innerCard}>
          <Image
            source={{ uri: member.image }}
            style={[styles.image, pressed && styles.imagePressed]}
            resizeMode="cover"
          />
        </View>
      </View>
      <Text style={styles.name}>{member.name}</Text>
    </Pressable>
  );
};

export default TeamCard;

const styles = StyleSheet.create({
  outerBorder: {
    padding: 1,
    borderRadius: 40,
    backgroundColor: Colors.primary,
  },
  innerCard: {
    padding: 15,
    overflow: "hidden",
    borderRadius: 40,
    backgroundColor: Colors.white,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  imagePressed: {
    opacity: 0.7,
  },

  name: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
