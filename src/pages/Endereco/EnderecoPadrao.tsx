import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { View, Text, Alert, } from 'react-native'
import { Button  } from 'react-native-elements'
import { Card, Title,  Switch, } from 'react-native-paper'

import { useCart } from '../../contexts/cart'
import Header from '../../components/Header' 

import firebase from '../../services/firebaseConection'
import { useNavigation } from '@react-navigation/native'
import { get } from '../../lib/storage'

interface EnderecoProps {
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    entrega: boolean
}

export function EnderecoPadrao() {
    const navigation = useNavigation()

    const { clear } = useCart()

    const [endereco, setEndereco] = useState<EnderecoProps>()
    const [idUsuario, setIdUsuario] = useState()


    // const [enderecoEntrega, setEnderecoEntrega] = useState([])



    const getUsuario = async () => {
        try {
            await firebase.firestore().collection('usuario').doc(idUsuario).onSnapshot((onSnapshot) => {
                const { endereco }: any = onSnapshot.data(); // pra pegar só o endereço
                setEndereco(endereco)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const buscarUsuario = async () => {
        const res: string | null = await get('idUsuario')
        setIdUsuario(res)
    }


    const finalizar = () => {
        Alert.alert('Salvo com sucesso')
        clear()
        navigation.navigate('Home')
    }

    useEffect(() => {
        buscarUsuario()
        getUsuario()

    }, [])


    const setCheck = async (index: any) => {
        const enderecoAtualizado = [] as any
        // pra verificar se tem mais de um endereco de entrega
        let contador = 0

        endereco.map((x: any, i: number) => {

            let { entrega } = x

            {
                i !== index
                    ? //if
                    enderecoAtualizado.push(x)
                    : // else
                    enderecoAtualizado.push({ ...x, entrega: !entrega })
            }
        })




        enderecoAtualizado.map((x: any) => {

            let { entrega } = x

            if (entrega == true) {
                contador++
            }

            if (contador > 1) {
                Alert.alert('Selecione apenas um endereço para entrega')
                setCheck(false)

            } else if (contador < 0) {
                Alert.alert('Selecione um endereço para entrega')

            }

        })

        firebase.firestore().collection('usuario')
            .doc(idUsuario).update({
                endereco: enderecoAtualizado
            })

    }


    const Item = ({ item, index }: { item: EnderecoProps, index: number }) => {
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