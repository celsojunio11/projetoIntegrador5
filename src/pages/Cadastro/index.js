import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'

import style from './styles'

import firebase from '../../services/firebaseConection'

import CustomHeader from '../../components/Header'
import { ScrollView } from 'react-native'

function Cadastro({ navigation }) {

    const [nome, setNome] = useState('')

    const [ddd, setDdd] = useState('')
    const [telefone, setTelefone] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')


    const onChangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    }

    const onChangePassword = (txtPassword) => {
        setPassword(txtPassword)
    }

    const onChangeNome = (txtNome) => {
        setNome(txtNome)
    }

    const onChangeTelefone = (txtTelefone) => {
        setTelefone(txtTelefone)
    }

    const onChangeDdd = (txtDdd) => {
        setDdd(txtDdd)
    }

    const onChangeLogradouro = (txtLogradouro) => {
        setLogradouro(txtLogradouro)
    }

    const onChangeNumero = (txtNumero) => {
        setNumero(txtNumero)
    }

    const onChangeComplemento = (txtComplemento) => {
        setComplemento(txtComplemento)
    }

    const onChangeBairro = (txtBairro) => {
        setBairro(txtBairro)
    }

    const onChangeCidade = (txtCidade) => {
        setCidade(txtCidade)
    }

    const onChangeEstado = (txtEstado) => {
        setEstado(txtEstado)
    }

    const onChangeCep = (txtCep) => {
        setCep(txtCep)
    }

    const buscarCep = (cep) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then((data) => {
                setLogradouro(data.logradouro)
                setComplemento(data.complemento)
                setBairro(data.bairro)
                setCidade(data.localidade)
                setEstado(data.uf)
            })
            .catch((err) => alert(err))
    }

    const Cadastration = () => {
        // criar usuario no auth do firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (data) => {
                const usuarioId = data.user.uid

                // criar usuario no firestore
                firebase.firestore().collection('usuario').doc(usuarioId).set({
                    nome: nome,
                    email: email,
                    telefone: ddd + telefone,
                    endereco: {
                        logradouro: logradouro,
                        numero: numero,
                        complemento: complemento,
                        bairro: bairro,
                        cidade: cidade,
                        estado: estado,
                    }
                })
             
                // navigation.navigate('Success')
                navigation.navigate('Padaria')
            }).catch((err) => {
                alert(err)
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <CustomHeader navigation={navigation} title={"Cadastro de Usuários"} />
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#DCDCDC', }}>

                    <Text style={style.text}>Nome</Text>
                    <TextInput style={style.input} value={nome} onChangeText={(txtNome) => onChangeNome(txtNome)} />

                    <Text style={style.text}>DDD + Telefone</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput style={[style.input, { width: '30%' }]} value={ddd} onChangeText={(txtDdd) => onChangeDdd(txtDdd)} />
                        <TextInput style={[style.input, { width: '70%' }]} value={telefone} onChangeText={(txtTelefone) => onChangeTelefone(txtTelefone)} />
                    </View>

                    <Text style={style.text}>Email</Text>
                    <TextInput style={style.input} value={email} onChangeText={(txtEmail) => onChangeEmail(txtEmail)} />

                    <Text style={style.text}>Senha</Text>
                    <TextInput secureTextEntry={true} style={style.input} value={password} onChangeText={(txtPassword) => onChangePassword(txtPassword)} />

                    <Text style={style.text}>Buscar Cep</Text>
                    <TextInput style={style.input} value={cep} onChangeText={(txtCep) => onChangeCep(txtCep)} onBlur={() => buscarCep(cep)} />

                    <Text style={style.text}>Logradouro</Text>
                    <TextInput style={style.input} value={logradouro} onChangeText={(textLogradouro) => onChangeLogradouro(textLogradouro)} />

                    <Text style={style.text}>Número</Text>
                    <TextInput style={style.input} value={numero} onChangeText={(textNumero) => onChangeNumero(textNumero)} />

                    <Text style={style.text}>Complemento</Text>
                    <TextInput style={style.input} value={complemento} onChangeText={(textComplemento) => onChangeComplemento(textComplemento)} />

                    <Text style={style.text}>Bairro</Text>
                    <TextInput style={style.input} value={bairro} onChangeText={(textBairro) => onChangeBairro(textBairro)} />

                    <Text style={style.text}>Cidade</Text>
                    <TextInput style={style.input} value={cidade} onChangeText={(textCidade) => onChangeCidade(textCidade)} />


                    <Text style={style.text}>Estado </Text>
                    <TextInput style={style.input} value={estado} onChangeText={(textEstado) => onChangeEstado(textEstado)} />


                    <Button buttonStyle={style.button} title="Cadastrar" onPress={Cadastration} />

                </View >
            </ScrollView>

        </View>
    )

}

export default Cadastro