import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'

import { ListItem, Button } from 'react-native-elements'
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper'

import CustomCard from '../../components/Card'

import firebase from '../../services/firebaseConection';


export default function home({ navigation }) {

    const { add } = useCart()

    const [data, setData] = useState([]);

    const [pesquisa, setPesquisa] = useState(null);
    const [tipo, setTipo] = useState('categoria');

    const pesquisar = async (search) => {
        setPesquisa(search)
        getProduct(search)
    };

    const getProduct = async (pesquisa) => {
        if (!pesquisa) {
            await firebase.firestore().collection('produto')
                .onSnapshot(
                    querySnapshot => {
                        const data = [];
                        querySnapshot.forEach(doc => {
                            data.push({
                                ...doc.data(),
                                id: doc.id
                            })
                        })
                        setData(data);
                    },
                    error => {
                        console.log(error)
                    }
                )
        }

        else {
            await firebase.firestore().collection('produto')
                .where('categoria', '==', pesquisa)
                .onSnapshot(querySnapshot => {
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


    }

    useEffect(() => {
        getProduct()
    }, [])


    const Item = ({ item }) => {

        const st = StyleSheet.create({
            container: { borderRadius: 20, margin: 10 },
            imagem: {
                borderRadius: 50,
                width: 100,
                height: 100,
            },
            title: { marginLeft: 5, marginBottom: 10, textTransform: 'capitalize', fontSize: 18 },
            content: { width: '65%', marginLeft: 50 },
            descricao: { marginLeft: 5, textTransform: 'capitalize', fontSize: 15 },
            preco: { marginTop: 25, color: 'red', fontWeight: 'bold' },
            button: { backgroundColor: "#E22C43", alignItems: 'flex-end', borderRadius: 20, padding: 10 }
        })

        const { id, nome, descricao, imagem, preco, categoria } = item
        return (
            <Card style={st.container}>
                <Card.Content>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 20 }}>
                            <Image
                                style={st.imagem}
                                source={{ uri: imagem }}
                            />
                        </View>
                        <View>
                            <Title>{nome}</Title>
                            <Paragraph style={st.descricao}>{descricao}</Paragraph>
                            <Paragraph style={st.preco}> R$ {preco.toFixed(2).replace('.', ',')}</Paragraph>
                        </View>
                    </View>
                </Card.Content>
                <Card.Actions style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                    <Button buttonStyle={st.button} title="Adicionar ao Carrinho" onPress={() => add(item)} />
                </Card.Actions>
            </Card>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} isHome={true} title={'Menu Principal'} />

            <Searchbar
                placeholder="Digite para pesquisar"
                style={{ margin: 10 }}
                value={pesquisa}
                onChangeText={(value) => pesquisar(value)}
            />

            <FlatList
                data={data}
                renderItem={Item}
                keyExtractor={(item) => item.id}
            />

        </View>
    )

}