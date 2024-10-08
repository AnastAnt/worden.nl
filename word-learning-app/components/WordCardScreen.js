/** @format */

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import Tts from "react-native-tts";

export default function WordCardScreen({ route }) {
  const { words } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const currentWord = words[currentIndex];

  const flipCard = () => setFlipped(!flipped);

  const nextWord = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const pronounceWord = () => {
    Tts.speak(currentWord.word);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={flipCard}>
        <Text style={styles.cardWord}>
          {flipped ? currentWord.translation : currentWord.word}
        </Text>
      </TouchableOpacity>

      {/* Кнопка для озвучення слова */}
      <TouchableOpacity onPress={pronounceWord}>
        <Text style={styles.buttonText}>Озвучити</Text>
      </TouchableOpacity>

      {/* Кнопка для переходу до наступного слова */}
      <TouchableOpacity style={styles.learnButton} onPress={nextWord}>
        <Text style={styles.learnButtonText}>Наступне слово</Text>
      </TouchableOpacity>
    </View>
  );
}
