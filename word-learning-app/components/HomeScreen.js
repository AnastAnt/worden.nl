/** @format */

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput } from "react-native";
import styles from "../styles";

export default function HomeScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false); // Стан для відображення модального вікна
  const [newWord, setNewWord] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WOORDSTUDIE</Text>

      {/* Кнопка для додавання нового слова */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>Nieuw woord</Text>
      </TouchableOpacity>

      {/* Модальне вікно для введення нового слова */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Введіть нове слово"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={newWord}
              onChangeText={setNewWord}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Логіка для збереження слова
                setShowModal(false);
              }}
            >
              <Text style={styles.buttonText}>Додати слово</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Блок категорій */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("WordList", { category: "Усі слова" })
        }
      >
        <Text style={styles.buttonText}>Перейти до слів</Text>
      </TouchableOpacity>
    </View>
  );
}
