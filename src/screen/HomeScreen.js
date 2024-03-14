import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, Vibration, View } from "react-native";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  cardName: {
    fontSize: 25,
    width: 300,
    height: 100,
    backgroundColor: "#08C5D1",
    borderRadius: 30,
    margin: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },

  cardSiret: {
    fontSize: 25,
    width: 300,
    height: 100,
    backgroundColor: "#04BBFF",
    borderRadius: 30,
    margin: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },

  cardAdresse: {
    fontSize: 25,
    width: 300,
    height: 100,
    backgroundColor: "#27C7D4",
    borderRadius: 30,
    margin: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },
};

export default function HomeScreen() {
  const navigation = useNavigation();

  const goToResearchName = () => {
    navigation.navigate("ResearchName");
    Vibration.vibrate(10);
  };

  const goToResearchSiret = () => {
    navigation.navigate("ResearchSiret");
    Vibration.vibrate(10);
  };

  const goToResearchAdresse = () => {
    navigation.navigate("ResearchAdresse");
    Vibration.vibrate(10);
  };

  return (
    <View style={styles.container}>
      {/* Affichage des différents type de recherche */}
      <TouchableOpacity onPress={goToResearchName}>
        <Text style={styles.cardName}>Recherche par nom</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToResearchSiret}>
        <Text style={styles.cardSiret}>Recherche par SIRET</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={goToResearchAdresse}>
        <Text style={styles.cardAdresse}>Recherche par adresse</Text>
      </TouchableOpacity> */}
      <StatusBar style="auto" />
    </View>
  );
}
