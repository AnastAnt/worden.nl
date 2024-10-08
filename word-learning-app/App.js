/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import WordListScreen from "./screens/WordListScreen";
import WordCardScreen from "./screens/WordCardScreen";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Головний екран */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Woordstudie",
            headerStyle: { backgroundColor: "#1c1c1c" },
            headerTintColor: "#FFA500",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("AddWord")}>
                <Icon
                  name="plus"
                  size={24}
                  color="#FFA500"
                  style={styles.icon}
                />
              </TouchableOpacity>
            ),
          })}
        />

        {/* Екран зі списком слів */}
        <Stack.Screen name="WordList" component={WordListScreen} />

        {/* Екран з картками */}
        <Stack.Screen name="WordCard" component={WordCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
