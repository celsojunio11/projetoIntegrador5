import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, TouchableOpacit, Image } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';

import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { TextInput } from 'react-native-gesture-handler'

import firebase from '../../../services/firebaseConection';

import CustomHeader from '../../../components/Header'

import CartProvider from '../../../contexts/cart'
import { useCart } from '../../../contexts/cart'

import styles from './styles'


function logado({ navigation }) {
    // if (firebase.auth().currentUser !== null) {

    // } else {
    //     navigation.navigate('login')
    // }

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


    const DeleteProduct = async (id) => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja excluir o produto?",

            [

                {
                    text: "Cancelar",
                    onPress: () => { },
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        await firebase.firestore().collection('produto').doc(id).delete()
                    }
                }
            ]
        )
    }


    useEffect(() => {
        GetProduct();
    }, [])



    return (
        <>

            <CustomHeader isHome={true} title={'Produtos'} navigation={navigation} />

            <Button style={{ marginTop: 20 }} title="Inserir Produto" onPress={() => {
                navigation.navigate("CadastrarProduto");
            }} />


            <ScrollView>
                {data.map((item, index) => {
                    return (


                        <Card key={index}>
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
                                    <Text>R$ {item.preco}</Text>
                                </View>
                            </View>
                            <Card.Divider />

                            <View style={{ flexDirection: 'row', }}>
                                <Button buttonStyle={{ backgroundColor: "#F7DE45" }} title="Atualizar Produto" onPress={() => navigation.navigate("AtualizarProduto", { data: item })} />
                                <Button buttonStyle={{ marginLeft: 25, backgroundColor: "#E82D30" }} title="Deletar Produto" onPress={() => DeleteProduct(item.id)} />
                            </View>
                        </Card>

                    )
                })}
            </ScrollView>
        </>
    )
}

export default logado;
