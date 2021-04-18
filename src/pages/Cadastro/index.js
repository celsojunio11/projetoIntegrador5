import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

import { Formik, Field } from 'formik'
import CustomHeader from '../../components/Header'
import CustomInput from '../../components/Input'
import CustomInputMask from '../../components/InputMask'
import TextInputMask from 'react-native-text-input-mask';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as yup from 'yup'
import style from './styles'
import axios from 'axios'

import firebase from '../../services/firebaseConection'


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
            .required('O campo estado é obrigatório')
        //  .length(9, ({ length }) => `O CEP deve ter ${length - 1} caracteres.`),
    })

    const [exist, setExist] = useState(false)

    const buscarCep = async (value, setFieldValue) => {
        let cep = value.replace('-', '') // remover a formatação
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
                setExist(true)
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
                        entrega: true,
                        logradouro: logradouro,
                        numero: numero,
                        complemento: complemento,
                        bairro: bairro,
                        cidade: cidade,
                        estado: estado,
                    }]
                })
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
                                    icon={'person'}
                                    placeholder='Nome'
                                    label='Nome'
                                />

                                <Field
                                    component={CustomInputMask}
                                    name='telefone'
                                    icon={'call'}
                                    mask="([00]) [00000]-[0000]"
                                    placeholder='Telefone'
                                    label='Telefone'
                                    keyboardType='numeric'
                                />

                                <Field
                                    component={CustomInput}
                                    name='email'
                                    icon={'mail'}
                                    placeholder='Email'
                                    label='Email'
                                    keyboardType='email-address'
                                />

                                <Field
                                    component={CustomInput}
                                    name='senha'
                                    icon={'lock-open'}

                                    placeholder='Senha'
                                    label='Senha'
                                    secureTextEntry
                                />

                                <Field
                                    component={CustomInputMask}
                                    name='cep'
                                    mask="[00000]-[000]"
                                    action={(cep) => buscarCep(cep, setFieldValue)}
                                    icon='search'
                                    placeholder='Pesquisar'
                                    label='Pesquisar CEP'
                                />

                                {exist

                                    ?
                                    <View>
                                        <Field
                                            component={CustomInput}
                                            icon='location'
                                            name='logradouro'
                                            placeholder='Logradouro'
                                            label='Logradouro'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='numero'
                                            placeholder='Número'
                                            label='Número'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='complemento'
                                            placeholder='Complemento'
                                            label='Complemento'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='bairro'
                                            placeholder='Bairro'
                                            label='Bairro'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='cidade'
                                            placeholder='Cidade'
                                            label='Cidade'
                                        />

                                        <Field
                                            icon='location'
                                            component={CustomInput}
                                            name='estado'
                                            placeholder='Estado'
                                            label='Estado'
                                        />
                                    </View>
                                    :
                                    <View />
                                }


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