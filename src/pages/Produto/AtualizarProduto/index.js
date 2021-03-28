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


function atualizarProduto({ navigation, route }) {

    const data = route.params.data;
    const [nome, setNome] = useState(data.nome);
    const [descricao, setDescricao] = useState(data.descricao);
    const [preco, setPreco] = useState(data.preco)

    const onChangeNome = (txtNome) => {
        setNome(txtNome);
    }

    const onChangeDescricao = (txtDescricao) => {
        setDescricao(txtDescricao);
    }

    const onChangePreco = (txtPreco) => {
        setPreco(txtPreco)
    }

    const UpdateProduct = async () => {

        try {
            if (nome == "" || nome == null)
                alert("Digite o nome")
            await firebase.firestore().collection('produto').doc(data.id).set({
                nome: nome,
                descricao: descricao,
                preco: preco,
                tipo: "teste",
                imagem: "https://api.tendaatacado.com.br/fotos/1588612800848.png"

            })
            alert('Atualizado com sucesso');
            navigation.navigate("ListarProduto")
        }
        catch (err) {
            alert(error)
        }


    }

    return (
        <View>
            <CustomHeader title={'Atualizar Produto'} navigation={navigation} />
            <View style={styles.containerInsert}>
                <View style={{ justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>Atualizar Produtos</Text>

                    <TextInput placeholder="Nome" style={styles.input} default value={nome} onChangeText={(txtNome) => onChangeNome(txtNome)} />

                    <TextInput placeholder="Descrição" value={descricao} style={styles.input} onChangeText={(txtDescricao) => onChangeDescricao(txtDescricao)} />

                    <TextInput placeholder="Preço" keyboardType={"numeric"} value={preco} style={styles.input} onChangeText={(txtPreco) => onChangePreco(txtPreco)} />
                    <Button title="Atualizar Produto" onPress={UpdateProduct} />
                </View>
            </View>
        </View>
    )
}



export default atualizarProduto