import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, } from 'react-native-elements'

import { TextInput } from 'react-native-gesture-handler'

import firebase from '../../../services/firebaseConection';


import CustomHeader from '../../../components/Header'

import styles from './styles'


function cadastrarProduto({ navigation }) {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState("")

    const onChangeNome = (txtNome) => {
        setNome(txtNome);
    }

    const onChangeDescricao = (txtDescricao) => {
        setDescricao(txtDescricao);
    }

    const onChangePreco = (txtPreco) => {
        setPreco(txtPreco)
    }

    const InsertProduct = async () => {
        try {
            if (nome == "" || nome == null)
                alert("Digite o nome")
            await firebase.firestore().collection('produto').add({
                nome: nome,
                descricao: descricao,
                preco: preco,
                tipo: "teste",
                imagem: "https://api.tendaatacado.com.br/fotos/1588612800848.png"
            })
            alert('Cadastrado com sucesso');
            navigation.navigate("ListarProduto")
        }
        catch (err) {
            alert(err)
        }

    }

    return (
        <View>
            <CustomHeader title={'Cadastrar Produto'} navigation={navigation} />
            <View style={styles.containerInsert}>
                <View style={{ justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 25 }}>Cadastrar Produtos</Text>

                    <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={(txtNome) => onChangeNome(txtNome)} />

                    <TextInput placeholder="Descrição" value={descricao} style={styles.input} onChangeText={(txtDescricao) => onChangeDescricao(txtDescricao)} />

                    <TextInput placeholder="Preço" keyboardType={"numeric"} value={preco} style={styles.input} onChangeText={(txtPreco) => onChangePreco(txtPreco)} />
                    <Button title="Inserir Produto" onPress={InsertProduct} />
                </View>
            </View>
        </View>
    )
}


export default cadastrarProduto