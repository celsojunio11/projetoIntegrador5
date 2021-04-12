import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik, Field } from 'formik'
import CustomHeader from '../../components/Header'
import CustomInput from '../../components/Input'
import * as yup from 'yup'
import style from './styles'

import firebase from '../../services/firebaseConection'

function Login({ navigation }) {

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

    const login = (email, senha) => {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
            navigation.navigate('Logado');
        }).catch((err) => {
            alert(err);
        })
    }

    return (

        <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} title={'Login de Usuários'} />

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', }}>

                <Formik validationSchema={validationSchema}

                    initialValues={{
                        email: '',
                        senha: ''
                    }}

                    onSubmit={({ email, senha }) => login(email, senha)}
                >
                    {({ handleSubmit, isValid }) => (
                        <>
                            <Field
                                component={CustomInput}
                                name='email'
                                placeholder='Email'
                                label='Email'
                                keyboardType='email-address'
                            />

                            <Field
                                component={CustomInput}
                                name='senha'
                                placeholder='Senha'
                                label='Senha'
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

export default Login;