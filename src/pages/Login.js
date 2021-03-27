import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler'
import firebase from '../services/firebaseConection'
import Logado from './logado';
import FailedLogin from './failedLogin';
import { Button } from 'react-native-elements';

import CustomHeader from './../components/Header'

function HomeLogin({ navigation }) {

    const style = StyleSheet.create({
        button: {
            backgroundColor: 'red',
            borderRadius: 20,
            borderWidth: 7,
            borderColor: 'red',
            width: 300,
            margin: 100,
            marginLeft: 30,
            justifyContent: 'center',
            marginBottom: 10,

        },

        text: {
            marginLeft: 10,
            margin: 50,
            marginBottom: -5,
            color: '#0b2031',
            fontSize: 20,
            fontWeight: 'bold'

        },

        textCad: {

            color: '#0b2031',
            fontSize: 30,
            fontWeight: 'bold',


        },

    })

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
        }).catch((err) => {
            alert(err);
        })
    }

    return (

        <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} title={"Login de Usuários"} />
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', }}>
                <Text style={style.text}>Email</Text>
                <TextInput style={{ alignItems: 'center', backgroundColor: 'white', textAlign: 'center', borderRadius: 50, borderWidth: 7, borderColor: '#DCDCDC', width: 350 }} value={email} onChangeText={(txtEmail) => onChangeEmail(txtEmail)} />
                <Text style={style.text}>Senha</Text>
                <TextInput style={{ alignItems: 'center', backgroundColor: 'white', textAlign: 'center', borderRadius: 50, borderWidth: 7, borderColor: '#DCDCDC', width: 350 }} secureTextEntry={true} value={password} onChangeText={(txtPassword) => onChangePassword(txtPassword)} />
                <Button buttonStyle={style.button} title="Login" onPress={login} />
            </View>
        </View>
    )
}

const Stack = createStackNavigator();

function LoginForm() {
    return (
        <Stack.Navigator   >
            <Stack.Screen name="Login" component={HomeLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Logado" component={Logado} options={{ headerShown: false }} />
            <Stack.Screen name="FailedLogin" component={FailedLogin} />

            {/* //component={FailedLogin} /> */}
        </Stack.Navigator>
    );
}

export default LoginForm;