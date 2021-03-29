import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'

import { Card, ListItem, Button, Icon } from 'react-native-elements'


import firebase from '../../services/firebaseConection';


export default function home({ navigation }) {

    const { add } = useCart()

    const [data, setData] = useState([]);

    const GetProduct = async () => {
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
        GetProduct()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} isHome={true} title={'Menu Principal'} />
            <ScrollView>
                <FlatList
                    data={data}
                    // contentContainerStyle={{ flex: 1, width: '100%', padding: 10 }}
                    keyExtractor={(item) => { item.id }}
                    renderItem={({ item, index }) => {
                        return (
                            // <View style={{ width: '100%', height: 100, padding: 10, borderWidth: 1, marginVertical: 10 }}>
                            <View>
                                {/*  {item.name}</Text>

                                <Text>Preço: {item.price}</Text>

                                <View style={{ flexDirection: 'row', width: "100%", marginTop: 15 }}>
                                    <Button title='Adicionar ao carrinho' buttonStyle={{ marginLeft: 15 }} onPress={() => { add(item) }} />
                                </View> */}
                                <Card>
                                    <Card.Title>{item.nome}</Card.Title>
                                    <Card.Divider />
                                    <View style={{ marginLeft: 25, flexDirection: 'row' }}>
                                        <Image
                                            style={{
                                                width: 80,
                                                height: 100,
                                            }}
                                            source={{ uri: item.imagem }}
                                        />

                                        <View style={{ marginLeft: 50 }}>
                                            <Text>{item.descricao}</Text>
                                            <Text>Preço R$ {item.preco}</Text>
                                        </View>
                                    </View>
                                    <Card.Divider />

                                    <View style={{ flexDirection: 'row', }}>
                                        <Button buttonStyle={{ backgroundColor: "#2089dc" }} title="Adicionar ao Carrinho" onPress={() => add(item)} />
                                    </View>
                                </Card>
                            </View>
                        )
                    }}

                />
            </ScrollView>
        </View>
    )

}

