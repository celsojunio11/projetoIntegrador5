import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper'
import { get } from '../../lib/storage'
import firebase from '../../services/firebaseConection'

import CustomHeader from '../../components/Header'
import { useNavigation } from '@react-navigation/core'
import { CardCategoria } from '../../components/CardCategoria'
import { Text } from 'react-native-elements'

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
            if (produto.categoria == search || produto.descricao == search) {
                filtrados.push(produto)
            }
        })
        await setFilteredData(filtrados)
    };


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
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <CardCategoria action={() => { navigation.navigate('PesquisarProduto', { categoria: item.categoria, produtos: filteredData }) }} renderItem={item} />
                )}


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
