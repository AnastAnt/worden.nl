/** @format */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
  },
  header: {
    fontSize: 32,
    color: "#FFA500",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    fontFamily: "Cochin",
  },
  button: {
    backgroundColor: "#1c1c1c",
    borderColor: "#FFF",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#2c2c2c",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#2c2c2c",
    borderColor: "#FFF",
    borderWidth: 1,
    color: "#FFF",
    marginBottom: 20,
  },
  learnButton: {
    backgroundColor: "#32CD32",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  learnButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  card: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32CD32",
    borderRadius: 10,
    marginBottom: 20,
  },
  cardWord: {
    fontSize: 24,
    color: "#FFF",
  },
  wordListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#2c2c2c",
    borderBottomWidth: 1,
  },
  icon: {
    fontSize: 20,
    color: "#FFF",
  },
});
