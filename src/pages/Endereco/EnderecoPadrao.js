import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text, ScrollView, } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import { Card, Title, Paragraph, TextInput, Switch,   } from 'react-native-paper'

import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'
import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from '../../services/firebaseConection'


export default function EnderecoPadrao({ navigation }) {

    const idCliente = firebase.auth().currentUser.uid

    const { clear } = useCart()

    const [endereco, setEndereco] = useState([])
    const [contador, setContador] = useState(0)

    // const [enderecoEntrega, setEnderecoEntrega] = useState([])

    const getUsuario = async () => {
        try {
            await firebase.firestore().collection('usuario').doc(idCliente).onSnapshot((onSnapshot) => {
                const { endereco } = onSnapshot.data(); // pra pegar só o endereço
                setEndereco(endereco)
            })
        } catch (error) {
            console.log(error)
        }
    }



    const finalizar = () => {
        alert('Salvo com sucesso')
        clear()
        navigation.navigate('Home')
    }

    useEffect(() => {
        getUsuario()
    }, [])


    const setCheck = async (index) => {
        const enderecoAtualizado = []
        // pra verificar se tem mais de um endereco de entrega
        let contador = 0

        endereco.map((x, i) => {

            let { entrega } = x

            {
                i !== index
                    ? //if
                    enderecoAtualizado.push(x)
                    : // else
                    enderecoAtualizado.push({ ...x, entrega: !entrega })
            }
        })




        enderecoAtualizado.map(x => {

            let { entrega } = x

            if (entrega == true) {
                contador++
            }

            if (contador > 1) {
                alert('Selecione apenas um endereço para entrega')
                setCheck(false)
                se
            } else if (contador < 0) {
                alert('Selecione um endereço para entrega')

            }

        })

        firebase.firestore().collection('usuario')
            .doc(idCliente).update({
                endereco: enderecoAtualizado
            })

    }


    const Item = ({ item, index }) => {

        const { logradouro, numero, complemento, bairro, cidade, estado, entrega } = item

        return (
            <Card style={{ flex: 1, justifyContent: 'center', alignContent: 'center', margin: 10, padding: 20 }}>

                {entrega ? <Title>Endereco Atual de Entrega</Title>
                    : <View />
                }
                <Text>{logradouro} nº {numero}, {complemento}</Text>
                <Text>{bairro}, {cidade}, {estado} </Text>

                <Text> {entrega}</Text>

                {/* <CheckBox
                    center
                    title='Endereço Atual de Entrega'
                    checked={entrega}
                    onPress={() => setCheck(index)}
                /> */}


                <Switch color={'#E22C43'} value={entrega} onValueChange={() => setCheck(index)} />

                {entrega ?
                    <Button title="Finalizar" buttonStyle={{ marginTop: 15 }} onPress={finalizar} />
                    : <View />

                }


            </Card>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} title={'Finalizar'} />

            <FlatList
                data={endereco}
                renderItem={Item}
                keyExtractor={(item) => item.id}
            />

        </View>

    )
}