import React from "react";
import { StatusBar, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#ecf0f1",
        padding: 8
    },
    map: {
        flex: 1 ,
        width: width,
        height: height,
    },
    item: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default styles