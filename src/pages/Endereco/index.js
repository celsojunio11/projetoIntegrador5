import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'

import firebase from '../../services/firebaseConection'

import style from './styles'

export default function cart(navigation) {

    const { clear, add, remove, cart, totalValue, removeItem } = useCart()

  



    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} isHome={true} title={'Endereço de Entrega'} />


            <ScrollView>
                
                <Button title="Endereço Padrão" buttonStyle={style.button} onPress={() => navigation.navigate('EnderecoPadrao')} />
                
                <Button title="Cadastrar novo endereço" buttonStyle={ style.button } onPress={() => navigation.navigate('EnderecoNovo')} />

            </ScrollView>


        </View>

    )

}