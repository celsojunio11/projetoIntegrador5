import React, { useState, useEffect } from 'react'
import { Alert, View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'

import { Button } from 'react-native-elements'
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper'



import firebase from '../../../services/firebaseConection'

import CustomHeader from '../../../components/Header'
import CustomCard from '../../../components/Card'

import CartProvider from '../../../contexts/cart'
import { useCart } from '../../../contexts/cart'

import styles from './styles'
import { } from 'react-native'


function ListarProdutos({ navigation }) {
    // if (firebase.auth().currentUser !== null) {

    // } else {
    //     navigation.navigate('login')
    // }

    const [data, setData] = useState([])

    const [pesquisa, setPesquisa] = useState(null)

    const pesquisar = async (search) => {
        setPesquisa(search)
        getProduct(search)
    }

    const getProduct = async (pesquisa) => {
        const categoria = []
        let newData = []
        if (!pesquisa) {
            await firebase.firestore().collection('produto')
                .onSnapshot(
                    querySnapshot => {
                        const data = []
                        querySnapshot.forEach(doc => {
                            categoria.push(doc.data().categoria)
                            data.push({
                                ...doc.data(),
                                id: doc.id
                            })
                        })

                        categoria.filter(
                            function (elem, index, self) {
                                index === self.indexOf(elem)
                                    ? newData.push(data[index])
                                    : console.log('false')

                            }
                        )

                        setData(newData)
                    },
                    error => {
                        console.log(error)
                    }
                )
        }

        else {

            await firebase.firestore().collection('produto')
                .where('categoria', '==', pesquisa)
                // .where()
                .onSnapshot(querySnapshot => {
                    const data = []
                    querySnapshot.forEach(doc => {
                        categoria.push(doc.data().categoria)

                        data.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })

                    categoria.filter(
                        function (elem, index, self) {
                            index === self.indexOf(elem)
                                ? newData.push(data[index])
                                : console.log('false')
                        }
                    )

                    setData(newData)
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
            title: { marginLeft: 5, fontSize: 18 },
            content: { width: '65%', marginLeft: 50 },
            descricao: { marginLeft: 5, fontSize: 15 },
            preco: { marginTop: 25, color: 'red', fontWeight: 'bold' }
        })

        const { id, nome, descricao, imagem, preco, categoria } = item
        return (

            <Card style={st.container}>
                <TouchableOpacity onPress={() => navigation.navigate('PesquisarProduto', categoria)} style={{ margin: 10, padding: 10 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 20 }}>
                            <Image
                                style={st.imagem}
                                source={{ uri: imagem }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Title>{nome}</Title>
                            <Paragraph style={st.descricao}>Mais de 10 variedades de {categoria}</Paragraph>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }

    return (
        <>
            <CustomHeader isHome={true} title={'Produtos'} navigation={navigation} />

            {/* <Button style={{ marginTop: 20 }} title="Pesquisar Produto" onPress={() => {
                navigation.navigate("PesquisarProduto")
            }} /> */}

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

        </>
    )
}

export default ListarProdutos
