import React, { useState, useEffect } from 'react'
import { Alert, View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import IconEntypo from 'react-native-vector-icons/Entypo'

import { Button } from 'react-native-elements'
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper'



import firebase from '../../services/firebaseConection'

import CustomHeader from '../../components/Header'
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

export function ListarProduto() {
    // if (firebase.auth().currentUser !== null) {

    // } else {
    //     navigation.navigate('login')
    // }
    const navigation = useNavigation()


    const [data, setData] = useState<[]>([])

    const [pesquisa, setPesquisa] = useState<string>('')

    const pesquisar = async (search: string) => {
        setPesquisa(search)
        getProduct(search)
    }

    const getProduct = async (pesquisa: string) => {
        const categoria = [] as any
        let newData = [] as any
        if (!pesquisa) {
            await firebase.firestore().collection('produto')
                .onSnapshot(
                    querySnapshot => {
                        const data = [] as any;
                        querySnapshot.forEach(doc => {
                            categoria.push(doc.data().categoria)
                            data.push({
                                ...doc.data(),
                                id: doc.id
                            })
                        })

                        categoria.filter(
                            function (elem: object, index: number, self: any) {
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
                    const data = [] as any
                    querySnapshot.forEach(doc => {
                        categoria.push(doc.data().categoria)

                        data.push({
                            ...doc.data(),
                            id: doc.id
                        })
                    })

                    categoria.filter(
                        function (elem: object, index: number, self: any) {

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
        getProduct('')
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
                <TouchableOpacity
                    onPress={() => navigation.navigate('PesquisarProduto', { categoria })}
                    style={{ margin: 10, padding: 10 }}>

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
