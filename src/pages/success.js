import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function success() {
    const style = StyleSheet.create({
        text: {
            
            margin: 65,
            marginBottom: -2,
            color: '#0b2031',
            fontSize: 20,
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center'

        },

    

    })

    return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC',}} >
        <Text style={style.text}>Cadastrado com sucesso</Text>
        </View>
    )
}

export default success;