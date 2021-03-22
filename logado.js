
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, SafeAreaView, StyleSheet, TouchableOpacit, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { TextInput } from 'react-native-gesture-handler'
import firebase from './firebaseConection';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from './Header';


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
                imagem: "https://api.tendaatacado.com.br/fotos/1588612800848.png"

            })
            alert('Cadastrado com sucesso');
            navigation.navigate("logado")
        }
        catch (err) {
            alert(error)
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

        console.log()
        try {
            if (nome == "" || nome == null)
                alert("Digite o nome")
            await firebase.firestore().collection('produto').doc(data.id).set({
                nome: nome,
                descricao: descricao,
                preco: preco,
                imagem: "https://api.tendaatacado.com.br/fotos/1588612800848.png"

            })
            alert('Atualizado com sucesso');
            navigation.navigate("logado")
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
        await firebase.firestore().collection('produto').doc(id).delete();
    }


    useEffect(() => {
        GetProduct();
    }, [])



    return (
        <>

            <CustomHeader isHome={true} title={'Menu Principal'} />

            <Button style={{ marginTop: 20 }} title="Inserir Produto" onPress={() => {
                navigation.navigate("CadastrarProduto");
            }} />


            <ScrollView>
                {data.map((item) => {
                    return (


                        <Card>
                            <Card.Title>{item.nome}</Card.Title>
                            <Card.Divider />
                            <View style={{ marginLeft: 25, flexDirection: 'row' }}>
                                <Image
                                    style={{
                                        width: 80,
                                        height: 100,
                                    }}
                                    source={{ uri: 'https://api.tendaatacado.com.br/fotos/1588612800848.png' }}
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

const Stack = createStackNavigator();

function CadastrationForm() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="logado" component={logado} />
            <Stack.Screen name="CadastrarProduto" component={cadastrarProduto} />
            <Stack.Screen name="AtualizarProduto" component={atualizarProduto} />
            {/* <Stack.Screen name="login" component={Login} /> */}
        </Stack.Navigator>
    );
}

export default CadastrationForm;

