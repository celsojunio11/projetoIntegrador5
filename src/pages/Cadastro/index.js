import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'

import style from './styles'

import firebase from '../../services/firebaseConection'

import CustomHeader from '../../components/Header'

function Cadastro({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    }

    const onChangePassword = (txtPassword) => {
        setPassword(txtPassword)
    }

    const Cadastration = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (data) => {
                const usuarioId = data.user.uid
                firebase.firestore().collection('usuario').doc(usuarioId).set({
                    nome: "nome",
                    email: email,
                    telefone: '99999999',
                    endereco: {
                        logradouro: 'rua',
                        numero: '000',
                        bairro: '',
                        cidade: '',
                        estado: '',
                    }
                })
                navigation.navigate('Success')
            }).catch((err) => {
                alert(err)
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} title={"Cadastro de Usuários"} />

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', }}>

                <Text style={style.text}>Email</Text>

                <TextInput style={{ alignItems: 'center', backgroundColor: 'white', textAlign: 'center', borderRadius: 50, borderWidth: 7, borderColor: '#DCDCDC', width: 350 }} value={email} onChangeText={(txtEmail) => onChangeEmail(txtEmail)} />

                <Text style={style.text}>Senha</Text>
                <TextInput secureTextEntry={true} style={{ backgroundColor: 'white', textAlign: 'center', borderRadius: 50, borderWidth: 7, borderColor: '#DCDCDC', width: 350 }} value={email} onChangeText={(txtEmail) => onChangeEmail(txtEmail)} value={password} onChangeText={(txtPassword) => onChangePassword(txtPassword)} />

                <Button buttonStyle={style.button} title="Cadastrar" onPress={Cadastration} />

            </View >
        </View>
    )

}

export default Cadastro