import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./src/screen/HomeScreen";
import InfoScreenName from "./src/screen/InfoScreenName";
import InfoScreenSiret from "./src/screen/InfoScreenSiret";
import ResearchAdresseScreen from "./src/screen/ResearchAdresseScreen";
import ResearchNameScreen from "./src/screen/ResearchNameScreen";
import ResearchSiretScreen from "./src/screen/ResearchSiretScreen";

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Accueil", headerLeft: false }}
        />
        <Stack.Screen
          name="ResearchName"
          component={ResearchNameScreen}
          options={{
            title: "Recherche par nom",
            headerTitleStyle: { fontSize: 18 },
          }}
        />
        <Stack.Screen
          name="ResearchSiret"
          component={ResearchSiretScreen}
          options={{
            title: "Recherche par SIREN/SIRET/TVA",
            headerTitleStyle: { fontSize: 18 },
          }}
        />
        <Stack.Screen
          name="ResearchAdresse"
          component={ResearchAdresseScreen}
          options={{
            title: "Recherche par adresse",
            headerTitleStyle: { fontSize: 18 },
          }}
        />
        <Stack.Screen
          name="InfoName"
          component={InfoScreenName}
          options={{
            title: "Informations",
            headerTitleStyle: { fontSize: 18 },
          }}
        />
        <Stack.Screen
          name="InfoSiret"
          component={InfoScreenSiret}
          options={{
            title: "Informations",
            headerTitleStyle: { fontSize: 18 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
