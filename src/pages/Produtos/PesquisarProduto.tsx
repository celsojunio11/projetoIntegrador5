import React, { useState, useEffect } from 'react'
import { Alert, View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'

import { Button } from 'react-native-elements'
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper'



import firebase from '../../services/firebaseConection'

import CustomHeader from '../../components/Header'

import CartProvider from '../../contexts/cart'
import { useCart } from '../../contexts/cart'
import { useNavigation } from '@react-navigation/core'

interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
    quantidade: number,
}


export function PesquisarProduto({ route }: any) {
    const navigation = useNavigation()

    const { categoria } = route.params

    const [data, setData] = useState([])

    const [pesquisa, setPesquisa] = useState<string>('')

    const pesquisar = async (search: string) => {
        setPesquisa(search)
        getProduct(search)
    }

    const getProduct = async (pesquisa: string) => {
        console.log(pesquisa)
        if (!pesquisa) {
            await firebase.firestore().collection('produto')
                .where('categoria', '==', categoria)
                .onSnapshot(querySnapshot => {
                    const data = [] as any
                    querySnapshot.forEach(doc => {
                        data.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })
                    setData(data)
                },
                    error => {
                        console.log(error)
                    }
                )
        }
        else {
            await firebase.firestore().collection('produto')
                .where('categoria', '==', categoria)
                .where('descricao', '==', pesquisa)
                .onSnapshot(
                    querySnapshot => {
                        const data = [] as any

                        querySnapshot.forEach(doc => {
                            data.push({
                                ...doc.data(),
                                id: doc.id
                            })
                        })
                        // setData(data)
                    },
                    error => {
                        console.log(error)
                    }
                )
        }
    }


    useEffect(() => {
        getProduct('')
        // return () => clearTimeout(timer);

    }, [])


    const Item = ({ item }: { item: ProdutoProps }) => {
        const st = StyleSheet.create({
            container: { borderRadius: 20, margin: 10 },
            imagem: {
                borderRadius: 50,
                width: 100,
                height: 100,
            },
            title: { marginLeft: 5, fontSize: 18 },
            content: { width: '65%', marginLeft: 50 },
            descricao: { marginLeft: 5, fontSize: 15 },
            preco: { marginTop: 25, color: 'red', fontWeight: 'bold' }
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
            </Card>
        )
    }

    return (
        <>
            <CustomHeader title={'Produtos'} navigation={navigation} />

            <Searchbar
                placeholder="Digite para pesquisar"
                style={{ margin: 10 }}
                value={`${pesquisa}`}
                onChangeText={(value) => pesquisar(value)}
            />

            <FlatList
                data={data}
                renderItem={Item}
                keyExtractor={(item) => item.id}
            />

        </>
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
    }
})
