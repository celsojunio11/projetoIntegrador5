import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler'
import firebase from './firebaseConection'
import Logado from './logado';
import FailedLogin from './failedLogin';

function HomeLogin({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail);
    }

    const onChangePassword = (txtPassword) => {
        setPassword(txtPassword);
    }

    const login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            navigation.navigate('Logado');
        }).catch(() => {
            navigation.navigate('FailedLogin');
        })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>Login de Usuário</Text>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={(txtEmail) => onChangeEmail(txtEmail)} />

            <Text>Senha</Text>
            <TextInput value={password} onChangeText={(txtPassword) => onChangePassword(txtPassword)} />
            <Button title="Entrar" onPress={login} />
        </View >
    )
}

const Stack = createStackNavigator();

function LoginForm() {
    return (
        <Stack.Navigator   >
            <Stack.Screen name="Entrar" component={HomeLogin} />
            <Stack.Screen name="Logado" component={Logado} />
            <Stack.Screen name="FailedLogin" component={Logado} />

            {/* //component={FailedLogin} /> */}
        </Stack.Navigator>
    );
}

export default LoginForm;