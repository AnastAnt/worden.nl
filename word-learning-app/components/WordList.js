/** @format */

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Іконки для редагування та галочки
import styles from "./styles";

export default function WordList({ words, toggleLearned, editWord }) {
  return (
    <View>
      {words.map((word, index) => (
        <View key={index} style={styles.wordListItem}>
          <Text style={styles.categoryText}>{word.word}</Text>

          {/* Іконка редагування */}
          <TouchableOpacity onPress={() => editWord(word)}>
            <Icon name="pencil" style={styles.icon} />
          </TouchableOpacity>

          {/* Позначення слова як вивченого */}
          <TouchableOpacity onPress={() => toggleLearned(word)}>
            <Icon
              name={word.learned ? "check-square-o" : "square-o"}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
