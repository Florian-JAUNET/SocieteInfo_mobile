import React from "react";
import { Text, View } from "react-native";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  infoEntreprise: {
    flex: 1,
    backgroundColor: "#fff",
  },

  textInfoEntreprise: {
    fontSize: 16,
    margin: 10,
  },
};

export default function InfoScreenName({ route }) {
  const { entreprise } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataEntreprise, setDataEntreprise] = React.useState(null);
  const [dataEtablissement, setDataEtablissement] = React.useState(null);

  const handleFindEntreprise = () => {
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
      .then((dataEntreprise) => {
        // console.log(dataEntreprise, null, 2);
        setDataEntreprise(dataEntreprise);
      })
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
      .then((dataEtablissement) => {
        // console.log(dataEtablissement, null, 2);
        setDataEtablissement(dataEtablissement);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container} onLayout={handleFindEntreprise}>
      <View style={styles.infoEntreprise}>
        {isLoading ? (
          <Text>Chargement des données...</Text>
        ) : dataEntreprise &&
          dataEntreprise.data &&
          dataEtablissement &&
          dataEtablissement.data ? (
          <>
            <Text style={styles.textInfoEntreprise}>
              Entreprise : {dataEntreprise.data.results[0].nomcommercial}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              SIREN : {dataEtablissement.data.results[0].siren}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              Adresse : {dataEtablissement.data.results[0].adresse}{" "}
              {dataEtablissement.data.results[0].cpville}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              Code NAF : {dataEtablissement.data.results[0].nafcode}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              Activité : {dataEtablissement.data.results[0].naflib}
            </Text>
          </>
        ) : (
          <Text>Aucune donnée</Text>
        )}
      </View>
    </View>
  );
}
