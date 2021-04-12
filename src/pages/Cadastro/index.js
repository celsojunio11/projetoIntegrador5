import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import { Formik, Field } from 'formik'
import CustomHeader from '../../components/Header'
import CustomInput from '../../components/Input' 

import * as yup from 'yup'
import style from './styles'
import axios from 'axios'

import firebase from '../../services/firebaseConection'
import {} from 'react-native';
import {  } from 'react-native';

function Cadastro({ navigation }) {

    const validationSchema = yup.object().shape({

        nome: yup
            .string()
            .required('O campo nome é obrigatório'),

        email: yup
            .string()
            .email('Digite um email válido')
            .required('O campo email é obrigatório'),

        telefone: yup
            .string()
            .min(9, ({ min }) => `O telefone deve ter pelo menos ${min} caracteres`)
            .required('O campo telefone é obrigatório'),

        senha: yup
            .string()
            .min(6, ({ min }) => `A senha deve ter pelo menos ${min} caracteres.`)
            .required('O campo senha é obrigatório'),

        logradouro: yup
            .string()
            .required('O campo logradouro é obrigatório'),

        numero: yup
            .string()
            .required('O campo numero é obrigatório'),

        // complemento: yup
        //     .string()
        //     .required('O campo complemento é obrigatório'),

        bairro: yup
            .string()
            .required('O campo bairro é obrigatório'),

        cidade: yup
            .string()
            .required('O campo cidade é obrigatório'),

        estado: yup
            .string()
            .required('O campo estado é obrigatório')
            .length(2, ({ length }) => `O estado deve ter ${length} caracteres.`),

        cep: yup
            .string()
            .length(8, ({ length }) => `O CEP deve ter ${length} caracteres.`),
    })

    const [cep, setCep] = useState('')

    const onChangeCep = (txtCep) => {
        setCep(txtCep)
    }

    const buscarCep = async (cep, setFieldValue) => {
        if (!cep.length || cep.length !== 8) {
            alert('CEP inválido')
        } else {
            try {
                const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                const { logradouro, bairro, localidade: cidade, uf: estado } = data
                setFieldValue('logradouro', logradouro)
                setFieldValue('bairro', bairro)
                setFieldValue('cidade', cidade)
                setFieldValue('estado', estado)
                setFieldValue('cep', cep)
            } catch (err) {
                alert(err)
            }
        }

    }


    const cadastrar = (values) => {
        const { email, senha, nome, ddd, telefone, logradouro, numero, complemento, bairro, cidade, estado } = values

        // criar usuario no auth do firebase
        firebase.auth().createUserWithEmailAndPassword(email, senha).then(

            (data) => {
                const usuarioId = data.user.uid

                // criar usuario no firestore
                firebase.firestore().collection('usuario').doc(usuarioId).set({
                    nome: nome,
                    email: email,
                    telefone: ddd + telefone,
                    endereco: [{
                        logradouro: logradouro,
                        numero: numero,
                        complemento: complemento,
                        bairro: bairro,
                        cidade: cidade,
                        estado: estado,
                    }]
                })
                // navigation.navigate('Success')
                navigation.navigate('Logado')

            }).catch((err) => {
                alert(err)
            })

    }

    return (

        <View style={{ flex: 1 }}>

            <CustomHeader navigation={navigation} title={'Cadastro de Usuários'} />

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', }}>
                <ScrollView>

                    <Formik validationSchema={validationSchema}

                        initialValues={{
                            email: '',
                            senha: '',
                            nome: '',
                            telefone: '',
                            cep: '',
                            logradouro: '',
                            numero: '',
                            complemento: '',
                            bairro: '',
                            cidade: '',
                            estado: '',
                        }}

                        onSubmit={(values) => {
                            cadastrar(values)
                        }}
                    >
                        {({ handleSubmit,
                            setFieldValue, // modificar valores do campo de endereco 
                            isValid // verifica se o objeto é lido

                        }) => (
                            <>
                                <Field
                                    component={CustomInput}
                                    name='nome'
                                    placeholder='Nome'
                                    label='Nome'
                                />

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '30%' }}>
                                        <Field
                                            component={CustomInput}
                                            name='ddd'
                                            placeholder='DDD'
                                            label='DDD'
                                            keyboardType='number-pad'
                                        />
                                    </View>
                                    <View style={{ width: '70%' }}>
                                        <Field
                                            component={CustomInput}
                                            name='telefone'
                                            placeholder='Telefone'
                                            label='Telefone'
                                            keyboardType='number-pad'
                                        />
                                    </View>
                                </View>


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

                                <Text style={[style.text, { marginBottom: 10 }]}>Buscar Cep</Text>

                                <TextInput
                                    name='cep'
                                    placeholder='Pesquisar CEP'
                                    style={style.input}
                                    value={cep}
                                    onChangeText={(txtCep) => onChangeCep(txtCep)}
                                    onBlur={() => buscarCep(cep, setFieldValue)}
                                />

                                <Field
                                    component={CustomInput}
                                    name='logradouro'
                                    placeholder='Logradouro'
                                    label='Logradouro'
                                />

                                <Field
                                    component={CustomInput}
                                    name='numero'
                                    placeholder='Número'
                                    label='Número'
                                />

                                <Field
                                    component={CustomInput}
                                    name='complemento'
                                    placeholder='Complemento'
                                    label='Complemento'
                                />

                                <Field
                                    component={CustomInput}
                                    name='bairro'
                                    placeholder='Bairro'
                                    label='Bairro'
                                />

                                <Field
                                    component={CustomInput}
                                    name='cidade'
                                    placeholder='Cidade'
                                    label='Cidade'
                                />

                                <Field
                                    component={CustomInput}
                                    name='estado'
                                    placeholder='Estado'
                                    label='Estado'
                                />

                                <Button buttonStyle={style.button}
                                    onPress={handleSubmit}
                                    title='Cadastrar'
                                    disabled={!isValid}
                                />

                            </>
                        )}
                    </Formik>
                </ScrollView>

            </View>

        </View>
    )

}

export default Cadastro;