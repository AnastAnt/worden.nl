/** @format */

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function WordListScreen({ route, navigation }) {
  const { category } = route.params;
  const [words, setWords] = useState([
    { word: "Cat", translation: "Кіт", learned: false },
    { word: "Dog", translation: "Собака", learned: false },
  ]);

  const toggleLearned = (word) => {
    setWords(
      words.map((w) =>
        w.word === word.word ? { ...w, learned: !w.learned } : w
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      {words.map((word, index) => (
        <View key={index} style={styles.wordListItem}>
          <Text style={styles.categoryText}>{word.word}</Text>
          <TouchableOpacity onPress={() => toggleLearned(word)}>
            <Icon
              name={word.learned ? "check-square-o" : "square-o"}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ))}

      {/* Кнопка для переходу до навчання */}
      <TouchableOpacity
        style={styles.learnButton}
        onPress={() => navigation.navigate("WordCard", { words })}
      >
        <Text style={styles.learnButtonText}>Leren</Text>
      </TouchableOpacity>
    </View>
  );
}
