import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'

export function Endereco() {

    const navigation = useNavigation()

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title={'Endereço de Entrega'} />


            <ScrollView>

                <Button title="Endereço Padrão" buttonStyle={styles.button} onPress={() => navigation.navigate('EnderecoPadrao')} />

                <Button title="Cadastrar novo endereço" buttonStyle={styles.button} onPress={() => navigation.navigate('EnderecoNovo')} />

            </ScrollView>


        </View>

    )

}


const styles = StyleSheet.create({
    containerInsert: {
        //padding: 5,
        backgroundColor: "#DDD"
    },
    input: {
        fontSize: 15,
        height: 50,
        borderWidth: 5,
        borderRadius: 15,
        marginBottom: 15,
        paddingHorizontal: 25,
        borderColor: "#0B2031",
    },
    button: {
        backgroundColor: '#2089dc',
        borderRadius: 5,
        borderWidth: 10,
        borderColor: '#2089dc',
        width: 300,
        margin: 100,
        marginLeft: 30,
        justifyContent: 'center',
        marginBottom: 5,

    },

    text: {
        marginLeft: 10,
        margin: 30,
        marginBottom: -5,
        color: '#0b2031',
        fontSize: 20,
        fontWeight: 'bold'

    },

    // input: {
    //     backgroundColor: 'white',
    //     textAlign: 'center',
    //     borderRadius: 50,
    //     borderWidth: 7,
    //     borderColor: '#DCDCDC',
    //     width: '100%'
    // },
})