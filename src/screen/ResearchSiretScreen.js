import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  ResearchBar: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    padding: 5,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 50,
    width: 300,
    textAlign: "center",
    position: "absolute",
    top: -50,
  },

  card: {
    fontSize: 25,
    width: "80%",
    minHeight: 150,
    backgroundColor: "#08F5F1",
    borderRadius: 25,
    margin: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
  },

  cardText: {
    fontSize: 16,
    margin: 5,
  },
};

export default function ResearchSiretScreen() {
  const navigation = useNavigation();
  const [siret, setSiret] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFind = async () => {
    setIsLoading(true);
    fetch(`https://api.societe.com/api/v1/entreprise/${siret}/etablissements`, {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": `socapi ${process.env.EXPO_PUBLIC_SOCIETE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(JSON.stringify(data, null, 2));
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.ResearchBar}
        placeholder="Entrez un numéro de SIRET"
        onChangeText={(text) => setSiret(text)}
        onEndEditing={handleFind}
      ></TextInput>

      {isLoading ? (
        <Text>Chargement en cours...</Text>
      ) : data && data.data ? (
        data.data.etablissements && data.data.etablissements[0] ? (
          <View
            style={styles.card}
            onTouchEndCapture={() =>
              navigation.navigate("InfoSiret", { siret })
            }
          >
            <Text style={styles.cardTitle}>
              {data.data.etablissements[0].deno}
            </Text>
            <Text style={styles.cardText}>
              SIRET : {data.data.etablissements[0].siret}
            </Text>
            <Text style={styles.cardText}>
              {data.data.etablissements[0].voieadr}{" "}
              {data.data.etablissements[0].codepostal}{" "}
              {data.data.etablissements[0].ville}
            </Text>
            <Text style={styles.cardText}></Text>
          </View>
        ) : (
          <Text>Aucune correspondance trouvée</Text>
        )
      ) : (
        <Text>Aucune information disponible</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
