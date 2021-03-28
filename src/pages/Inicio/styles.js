import React from 'react'
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
    button: {
        backgroundColor: '#f00',
        borderRadius: 100,
        borderWidth: 8,
        borderColor: '#f00',
        width: 300,
        margin: 1,
        justifyContent: 'center',
        marginBottom: -15

    },

    buttonCadastro: {
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'transparent',
        width: 300,
        margin: 1,
        justifyContent: 'center',

    },

    text: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'


    },

    container: {
        flex: 1,
        flexDirection: 'column'
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center'
    },

})

export default style