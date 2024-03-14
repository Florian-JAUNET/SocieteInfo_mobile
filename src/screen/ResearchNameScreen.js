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

export default function ResearchNameScreen() {
  // Création de constantes pour la navigation et de states pour les données de l'entreprise recherchée
  const navigation = useNavigation();
  const [dataEntreprise, setDataEntreprise] = useState(null);
  const [dataEtablissement, setDataEtablissement] = useState(null);
  const [entreprise, setEntreprise] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fait appel à l'API de Societe.com pour récupérer les informations de l'entreprise recherchée
  const handleFind = async () => {
    setIsLoading(true);
    fetch(
      `https://api.societe.com/api/v1/entreprise/search?nom=${entreprise}&debut=5&nbrep=3`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": `socapi ${process.env.EXPO_PUBLIC_SOCIETE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      // .then((data) => console.log(JSON.stringify(data, null, 2)))
      .then((dataEntreprise) => setDataEntreprise(dataEntreprise))
      .catch((error) => console.error(error));

    fetch(
      `https://api.societe.com/api/v1/etablissement/search?nom=${entreprise}&debut=5&nbrep=3`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": `socapi ${process.env.EXPO_PUBLIC_SOCIETE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      // .then((data) => console.log(JSON.stringify(data, null, 2)))
      .then((dataEtablissement) => {
        setDataEtablissement(dataEtablissement);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.ResearchBar}
        placeholder="Entrez le nom d'une entreprise"
        onChangeText={(text) => setEntreprise(text)}
        onEndEditing={handleFind}
      />
      {isLoading ? (
        <Text>Chargement en cours...</Text>
      ) : dataEntreprise &&
        dataEntreprise.data &&
        dataEntreprise.data.results.length > 0 ? (
        dataEntreprise.data.results.map((result, index) => {
          const dataEtablissementResult =
            dataEtablissement && dataEtablissement.data
              ? dataEtablissement.data.results[index]
              : null;
          return (
            <View
              key={index}
              style={styles.card}
              onTouchEndCapture={() =>
                navigation.navigate("InfoName", { entreprise })
              }
            >
              <Text style={styles.cardTitle}>{result.nomcommercial}</Text>
              <Text style={styles.cardText}>SIREN : {result.siren}</Text>
              {dataEtablissementResult && (
                <Text style={styles.cardText}>
                  {dataEtablissementResult.adresse}
                </Text>
              )}
              <Text style={styles.cardText}>{result.cpville}</Text>
            </View>
          );
        })
      ) : (
        <Text>Aucune information disponible</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}
