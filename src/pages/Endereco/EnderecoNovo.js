import React, { useState } from 'react';
import { View, ScrollView, } from 'react-native';
import { Button } from 'react-native-elements';

import { Formik, Field } from 'formik'
import CustomHeader from '../../components/Header'
import CustomInput from '../../components/Input'
import CustomInputMask from '../../components/InputMask'
import { useCart } from '../../contexts/cart'

import * as yup from 'yup'
import style from './styles'
import axios from 'axios'

import firebase from '../../services/firebaseConection'

function Cadastro({ navigation }) {

    const validationSchema = yup.object().shape({

        logradouro: yup
            .string()
            .required('O campo logradouro é obrigatório'),

        numero: yup
            .string()
            .required('O campo numero é obrigatório'),

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

        // cep: yup
        //     .string()
        //     .length(9, ({ length }) => `O CEP deve ter ${length - 1 } caracteres.`),
    })


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
            } catch (err) {
                alert(err)
            }
        }

    }

    const { clear } = useCart()


    const atualizar = async (values) => {
        try {
            const usuarioId = firebase.auth().currentUser.uid
            const { logradouro, numero, complemento, bairro, cidade, estado } = values
            await firebase.firestore().collection('usuario').doc(usuarioId).update({

                // para adicionar novo endereco no array
                endereco: firebase.firestore.FieldValue.arrayUnion({
                    entrega: true,
                    logradouro: logradouro,
                    numero: numero,
                    complemento: complemento,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                })
            }).then(() => {
                alert('Cadastrado com sucesso')
                clear()
                navigation.navigate('Home')
            }).catch((err) => {
                alert(err)
            })


        } catch (error) {
            alert(error)
        }
    }

    return (

        <View style={{ flex: 1 }}>

            <CustomHeader navigation={navigation} title={'Novo Endereço'} />


            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', }}>
                <ScrollView>

                    <Formik validationSchema={validationSchema}

                        initialValues={{
                            cep: '',
                            logradouro: '',
                            numero: '',
                            complemento: '',
                            bairro: '',
                            cidade: '',
                            estado: '',
                        }}

                        onSubmit={(values) => {
                            atualizar(values)
                        }}
                    >
                        {({ handleSubmit,
                            setFieldValue, // modificar valores do campo de endereco 
                            isValid // verifica se o objeto é lido

                        }) => (
                            <>

                                <Field
                                    component={CustomInputMask}
                                    name='cep'
                                    mask="[00000]-[000]"
                                    action={(cep) => buscarCep(cep, setFieldValue)}
                                    icon='search'
                                    placeholder='Pesquisar'
                                    label='Pesquisar CEP'
                                />


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

                                <Button buttonStyle={{ marginTop: 15 }}
                                    onPress={handleSubmit}
                                    title='Finalizar'
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