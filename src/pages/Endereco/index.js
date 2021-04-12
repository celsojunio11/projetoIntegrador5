import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'

import style from './styles'

export default function cart({ navigation, route }) {


    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation}  title={'Endereço de Entrega'} />


            <ScrollView>

                <Button title="Endereço Padrão" buttonStyle={style.button} onPress={() => navigation.navigate('EnderecoPadrao')} />

                <Button title="Cadastrar novo endereço" buttonStyle={style.button} onPress={() => navigation.navigate('EnderecoNovo')} />

            </ScrollView>


        </View>

    )

}