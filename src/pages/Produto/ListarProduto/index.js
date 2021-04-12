import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, TouchableOpacit, Image } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';

import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { TextInput } from 'react-native-gesture-handler'

import firebase from '../../../services/firebaseConection';

import CustomHeader from '../../../components/Header'
import CustomCard from '../../../components/Card'

import CartProvider from '../../../contexts/cart'
import { useCart } from '../../../contexts/cart'

import styles from './styles'


function ListarProdutos({ navigation }) {
    // if (firebase.auth().currentUser !== null) {

    // } else {
    //     navigation.navigate('login')
    // }

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
        getProduct();
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
            preco: { marginTop: 25, color: 'red', fontWeight: 'bold' }
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
                </Card>
            </View>
        )
    }

    return (
        <>
            <CustomHeader isHome={true} title={'Produtos'} navigation={navigation} />

            {/* <Button style={{ marginTop: 20 }} title="Inserir Produto" onPress={() => {
                navigation.navigate("CadastrarProduto");
            }} /> */}

            <FlatList
                data={data}
                renderItem={Item}
                keyExtractor={(item) => item.id}
            />

        </>
    )
}

export default ListarProdutos;
