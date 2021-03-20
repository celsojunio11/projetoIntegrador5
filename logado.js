import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler'
import firebase from './firebaseConection';
import { createStackNavigator } from '@react-navigation/stack';

// import Login from './Login'

function logado({ navigation }) {
    // if (firebase.auth().currentUser !== null) {

    // } else {
    //     navigation.navigate('login')
    // }
    const [nome, setNome] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);

    const onChangeNome = (txtNome) => {
        setNome(txtNome);
    }

    const onChangeDescription = (txtDescription) => {
        setDescription(txtDescription);
    }

    const InsertProduct = async () => {
        await firebase.firestore().collection('produto').add({
            nome: "nome",
            descricao: "f",
            imagem: "f",
            tipo: "f",
        })
        alert('Cadastrado com sucesso');

    }

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
        GetProduct()
        {
            // let ref = firebase.firestore().collection('produto').onSnapshot(querySnapshot => {
            //     const data = [];
            //     querySnapshot.forEach(doc => {
            //         data.push({
            //             ...doc.data(),
            //             key: doc.id
            //         })
            //     })
            //     setData(data)
            // })
            // return () => ref()
        }

    }, [])

    return (
        <View>

            <Text>Cadastar Produtos</Text>

            <TextInput value={nome} onChangeText={(txtNome) => onChangeNome(txtNome)} />
            <TextInput value={description} onChangeText={(txtDescription) => onChangeDescription(txtDescription)} />

            <Button title="Inserir Produto" onPress={InsertProduct} />

            <Text>Produtos Cadastrados</Text>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View >
                        <Text>Nome: {item.nome}</Text>
                        <Text>Descrição: {item.desc}</Text>
                        <Text>id: {item.id}</Text>
                        <Button title="Deletar Produto" onPress={() => DeleteProduct(item.id)} />
                    </View>
                )}
            />
        </View>

    )
}



const Stack = createStackNavigator();

function CadastrationForm() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="logado" component={logado} />
            {/* <Stack.Screen name="login" component={Login} /> */}
        </Stack.Navigator>
    );
}

export default CadastrationForm;
