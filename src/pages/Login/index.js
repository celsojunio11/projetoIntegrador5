import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler'

import CustomHeader from '../../components/Header'

import style from './styles'

import firebase from '../../services/firebaseConection'


function Login({ navigation }) {

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



export default Login;