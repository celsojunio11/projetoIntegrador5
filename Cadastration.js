import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler'
import firebase from './firebaseConection'
import success from "./success";


function TaskForm({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail);
    }

    const onChangePassword = (txtPassword) => {
        setPassword(txtPassword);
    }

    const Cadastration = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            navigation.navigate('Success');
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Cadastro de Usuários</Text>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={(txtEmail) => onChangeEmail(txtEmail)} />

            <Text>Senha</Text>
            <TextInput value={password} onChangeText={(txtPassword) => onChangePassword(txtPassword)} />
            <Button title="Cadastrar" onPress={Cadastration} />
        </View >
    )

}

const Stack = createStackNavigator();

function CadastrationForm() {
    return (
        <Stack.Navigator  >
            <Stack.Screen name="Cadastrar" component={TaskForm} />
            <Stack.Screen name="Success" component={success} />
        </Stack.Navigator>
    );
}

export default CadastrationForm;