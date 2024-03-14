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

export default function InfoScreenSiret({ route }) {
  const { siret } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [dataSiret, setDataSiret] = React.useState(null);

  const handleFindEntreprise = () => {
    setIsLoading(true);
    fetch(`https://api.societe.com/api/v1/entreprise/${siret}/etablissements`, {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": `socapi ${process.env.EXPO_PUBLIC_SOCIETE_API_KEY}`,
      },
    })
      .then((response) => response.json())
      // .then((response) => console.log(response))
      .then((dataSiret) => {
        // console.log(JSON.stringify(dataSiret, null, 2));
        setDataSiret(dataSiret);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container} onLayout={handleFindEntreprise}>
      <View style={styles.infoEntreprise}>
        {isLoading ? (
          <Text>Chargement des données...</Text>
        ) : dataSiret && dataSiret.data ? (
          <>
            <Text style={styles.textInfoEntreprise}>
              Entreprise : {dataSiret.data.etablissements[0].deno}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              SIRET : {dataSiret.data.etablissements[0].siret}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              Adresse : {dataSiret.data.etablissements[0].voieadr}{" "}
              {dataSiret.data.etablissements[0].codepostal}{" "}
              {dataSiret.data.etablissements[0].ville}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              Code NAF : {dataSiret.data.etablissements[0].naf}
            </Text>
            <Text style={styles.textInfoEntreprise}>
              Activité : {dataSiret.data.etablissements[0].naflib}
            </Text>
          </>
        ) : (
          <Text>Aucune donnée</Text>
        )}
      </View>
    </View>
  );
}
