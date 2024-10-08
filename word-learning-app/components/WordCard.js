/** @format */

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Tts from "react-native-tts"; // Для озвучення слова
import styles from "./styles";

export default function WordCard({ word, translation }) {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => setFlipped(!flipped);

  const pronounceWord = () => {
    Tts.speak(word);
  };

  return (
    <TouchableOpacity onPress={flipCard} style={styles.card}>
      {!flipped ? (
        <Text style={styles.cardWord}>{word}</Text>
      ) : (
        <Text style={styles.cardTranslation}>{translation}</Text>
      )}
      <TouchableOpacity onPress={pronounceWord}>
        <Text style={styles.buttonText}>Озвучити</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
