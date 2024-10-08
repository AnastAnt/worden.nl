/** @format */

import React from "react";
import { View, Text } from "react-native";
import * as Progress from "react-native-progress";
import styles from "./styles";

export default function Stats({ totalWords, learnedWords }) {
  const progress = totalWords > 0 ? learnedWords / totalWords : 0;

  return (
    <View style={styles.progressBar}>
      <Text style={styles.statsText}>
        Прогрес: {learnedWords} із {totalWords}
      </Text>
      <Progress.Bar progress={progress} width={200} color="#32CD32" />
    </View>
  );
}
