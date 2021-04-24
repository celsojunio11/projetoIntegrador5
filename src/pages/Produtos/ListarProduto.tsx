import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
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

    const navigation = useNavigation()

    const [data, setData] = useState<[ProdutoProps]>([] as any)
    const [filteredData, setFilteredData] = useState<[ProdutoProps]>()
    const [pesquisa, setPesquisa] = useState<string>('');


    const pesquisar = async (search: string) => {
        setPesquisa(search)
        const filtrados = [] as any;
        data.filter((produto) => {
            if (produto.categoria == search) {
                filtrados.push(produto)
            }
        })
        await setFilteredData(filtrados)
    };

    const filtrar = async (search: string) => {
        if (search === 'Todos' || '') {
            return setFilteredData(data)
        }
        else {
            const filtrados = [] as any;
            data.filter((produto) => {
                if (produto.categoria == search) {
                    filtrados.push(produto)
                }
            })
            await setFilteredData(filtrados)
        }
    }

    const getProduct = async () => {
        const data = [] as any;
        const categorias = ['Todos'] as any;

        await firebase.firestore().collection('produto')
            .onSnapshot(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        // array de produtos
                        data.push({
                            ...doc.data(),
                            id: doc.id
                        })

                        //para usar como filtro
                        categorias.push(
                            doc.data().categoria,
                        )
                    })

                    setData(data)
                    setFilteredData(data)
                },
                error => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getProduct()

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
            descricao: { marginLeft: 5, fontSize: 15, flex: 1 },
            preco: { marginTop: 25, color: 'red', fontWeight: 'bold' }
        })

        const { id, nome, descricao, imagem, preco, categoria } = item
        return (

            <Card style={st.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PesquisarProduto', { categoria, produtos: filteredData })}
                    style={{ margin: 10, padding: 10 }}>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 20, }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Image
                                    style={st.imagem}
                                    source={{ uri: imagem }}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Title>{categoria}</Title>
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
                showsVerticalScrollIndicator={false}
                data={filteredData}
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
