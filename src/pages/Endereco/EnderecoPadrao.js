import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'

import firebase from '../../services/firebaseConection'


export default function cart(navigation) {

    const { clear, add, remove, cart, totalValue, removeItem } = useCart()

    async function finalizar() {
        let novoCarrinho = []

        cart.map((x) => {
            novoCarrinho.push(
                { id: x.id, quantidade: x.quantidade })
        })
        try {
            await firebase.firestore().collection('pedido').add({
                idCliente: firebase.auth().currentUser.uid,
                data: Date(),
                itens: novoCarrinho,
                observacao: '',
                finalizado: false,
                bairro: '',
                cidade: 'Rua zeze'
            })

        } catch (error) {
            alert(error)
        }

        /*const dados = {
            idCliente: firebase.auth().currentUser.uid,
            bairro: '',
            cidade: ''
        }*/

    }

    
   

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} isHome={true} title={'Finalizar'} />

          
            <ScrollView>
               <Text>Teste</Text>

            </ScrollView>
            
            <Button title="finalizar" buttonStyle={{ marginTop: 15 }} onPress={() => finalizar(cart)} />
        </View>

    )
}