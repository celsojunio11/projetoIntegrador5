import React from 'react';
import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-elements';
import { Formik, Field } from 'formik'
import { useNavigation } from '@react-navigation/native'

import CustomHeader from '../components/Header'
import CustomInput from '../components/Input'
import * as yup from 'yup'


import firebase from '../services/firebaseConection'

interface UsuarioProps {
    senha: string,
    email: string,
    // uid: string
}


export function Login() {

    const usuario = firebase.auth().currentUser
    const navigation = useNavigation()

    const validationSchema = yup.object().shape({

        email: yup
            .string()
            .email('Digite um email válido')
            .required('O campo email é obrigatório'),
        senha: yup
            .string()
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`)
            .required('O campo senha é obrigatório'),
    })

  
    const login = ({ email, senha }: UsuarioProps) => {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {

            // storeData({ email, senha } )
            navigation.navigate('Logado');
        }).catch((err) => {
            Alert.alert(err);
        })
    }

    return (

        <View style={{ flex: 1 }}>
            <CustomHeader isHome={false} navigation={navigation} title={'Login de Usuários'} />

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', }}>

                <Formik validationSchema={validationSchema}

                    initialValues={{
                        email: 'joao@teste.com',
                        senha: '123456'
                    }}

                    onSubmit={({ email, senha }) => login({ email, senha })}
                >
                    {({ handleSubmit, isValid }) => (
                        <>
                            <Field
                                component={CustomInput}
                                name='email'
                                placeholder='Email'
                                label='Email'
                                icon={'mail'}
                                keyboardType='email-address'
                            />

                            <Field
                                component={CustomInput}
                                name='senha'
                                placeholder='Senha'
                                label='Senha'
                                icon={'lock-open'}
                                secureTextEntry
                            />

                            <Button buttonStyle={style.button}
                                onPress={handleSubmit}
                                title='Login'
                                disabled={!isValid}
                            />
                        </>
                    )}
                </Formik>
            </View>

        </View>
    )
}


const style = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        borderRadius: 20,
        // borderWidth: 7,
        borderColor: 'red',
        width: 300,
        height: 45,
        // margin: 100,
        marginTop: 20,
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