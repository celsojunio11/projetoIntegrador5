import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'

import { Card, ListItem, Button, } from 'react-native-elements'

import CustomCard from '../../components/Card'

import firebase from '../../services/firebaseConection';


export default function home({ navigation }) {

    const { add } = useCart()

    const [data, setData] = useState([]);

    const getProduct = async () => {
        await firebase.firestore().collection('produto').onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.forEach(doc => {
                data.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setData(data);
        })
    }

    useEffect(() => {
        getProduct()
    }, [])




    const Item = ({ item }) => {

        const st = StyleSheet.create({
            container: { width: '100%', borderRadius: 20 },
            imagem: {
                borderRadius: 50,
                width: 100,
                height: 100,
            },
            title: { textAlign: 'center', marginBottom: 10, textTransform: 'capitalize', fontSize: 18 },
            content: { width: '65%', marginLeft: 50 },
            descricao: { textTransform: 'capitalize', fontSize: 15 },
            preco: { marginTop: 25, color: 'red', fontWeight: 'bold' },
            button: { backgroundColor: "#E22C43", alignItems: 'flex-end' }
        })

        const { id, nome, descricao, imagem, preco, categoria } = item
        return (
            <View>
                <Card style={st.container}>
                    <Card.Title style={st.title}>{nome}</Card.Title>
                    <Card.Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '20%', marginBottom: 20 }}>
                            <Image
                                style={st.imagem}
                                source={{ uri: imagem }}
                            />
                        </View>
                        <View style={st.content}>
                            <ListItem.Subtitle style={st.descricao}>{descricao}</ListItem.Subtitle>
                            <ListItem.Subtitle style={st.preco}> R$ {preco.toFixed(2).replace('.', ',')}</ListItem.Subtitle>
                        </View>
                    </View>
                    <Card.Divider />
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button buttonStyle={st.button} title="Adicionar ao Carrinho" onPress={() => add(item)} />
                    </View>
                </Card>
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} isHome={true} title={'Menu Principal'} />

            <FlatList
                data={data}
                renderItem={Item}
                keyExtractor={(item) => item.id}
            />

        </View>
    )

}