import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text, ScrollView, } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from '../../services/firebaseConection'


export default function EnderecoPadrao({ navigation }) {

    const idCliente = firebase.auth().currentUser.uid

    const { clear } = useCart()

    const getUsuario = async () => {
        await firebase.firestore().collection('usuario').doc(idCliente).onSnapshot((onSnapshot) => {

            const { endereco } = onSnapshot.data(); // pra pegar só o endereço
            setEndereco(endereco)
        })
    }

    const [endereco, setEndereco] = useState([])

    useEffect(() => {
        getUsuario()
    }, [])

    const Item = ({ item }) => {
        const { logradouro, numero, complemento, bairro, cidade, estado } = item

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <Card>
                    <Text>{logradouro}</Text>
                    <Text>{numero}</Text>
                    <Text>{complemento}</Text>
                    <Text>{bairro}</Text>
                    <Text>{cidade}</Text>
                    <Text>{estado}</Text>
                    <Button title="Finalizar" buttonStyle={{ marginTop: 15 }} onPress={finalizar} />

                </Card>
            </View>
        )
    }

    const finalizar = () => {
        alert('Salvo com sucesso')
        clear()
        navigation.navigate('Home')
    }

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title={'Finalizar'} />

            <FlatList
                data={endereco}
                renderItem={Item}
                keyExtractor={(index) => index}
            />

        </View>

    )
}