/** @format */

import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import styles from "../styles";

export default function AddWordForm({
  word,
  setWord,
  translation,
  setTranslation,
  category,
  setCategory,
  addWord,
}) {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Слово"
        value={word}
        onChangeText={setWord}
      />
      <TextInput
        style={styles.input}
        placeholder="Переклад"
        value={translation}
        onChangeText={setTranslation}
      />
      <TextInput
        style={styles.input}
        placeholder="Категорія"
        value={category}
        onChangeText={setCategory}
      />
      <TouchableOpacity style={styles.button} onPress={addWord}>
        <Text style={styles.buttonText}>Додати</Text>
      </TouchableOpacity>
    </View>
  );
}
