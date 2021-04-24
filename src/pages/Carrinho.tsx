import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, TextInput } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useCart } from '../contexts/cart'
import Header from '../components/Header'
import { get } from '../lib/storage'
import firebase from '../services/firebaseConection'
import { useNavigation } from '@react-navigation/core'
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho'

interface ProdutoProps {
    id?: string, // ?opcional
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria?: string,
    quantidade: number,
}

export function Carrinho() {

    const navigation = useNavigation()

    const { add, remove, cart, totalValue, removeItem } = useCart()

    const [observacao, setObservacao] = useState<string>('')
    const [cardVisible, setCardVisible] = useState<boolean>(true)
    const [icon, setIcon] = useState('chevron-up-circle-outline')
    const [idUsuario, setIdUsuario] = useState<string | null>()

    const trocaIcon = (icon: boolean) => {
        icon ? setIcon('chevron-up-circle-outline')
            : setIcon('chevron-down-circle-outline')
        setCardVisible(icon)
    }

    const buscarUsuario = async () => {
        const res = await get('idUsuario')
        setIdUsuario(res)
    }

    async function finalizar() {
        let novoCarrinho = [] as any[];

        const dataAtual = new Date() // para salvar como timestamp

        cart.map((x: any) => {
            novoCarrinho.push(
                { nome: x.nome, quantidade: x.quantidade }) // pra pegar só nome e quantidade
        })

        const dados = {
            idCliente: idUsuario,
            data: dataAtual,
            itens: novoCarrinho,
            observacao: observacao,
            finalizado: false
        }

        await firebase.firestore().collection('pedido').add(dados)
            .catch((err: any) => {
                Alert.alert(err)
            })

        Alert.alert('Pedido cadastrado com sucesso')
        navigation.navigate('Endereco', { idCliente: dados.idCliente })
    }



    const onChange = (txt: string) => {
        setObservacao(txt)
    }

    useEffect(() => {
        buscarUsuario()
    }, [])

    if (cart.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={navigation} isHome={true} title={'Carrinho'} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                    <Text style={{ fontSize: 25 }}>Carrinho Vazio</Text>
                    <Text style={{ fontSize: 28 }}>{'😋'}</Text>
                </View>
            </View>

        )
    }

    return (
        <View style={{ flex: 1, }}>
            <Header navigation={navigation} isHome={true} title={'Carrinho'} />

            <FlatList
                data={cart}
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => (
                    <CardProdutoCarrinho
                        renderItem={item}
                        adicionar={() => add(item)}
                        remover={() => remove(item)}
                        deletar={() => removeItem(item)}
                    />
                )}
            />

            <Card style={{ margin: 10, paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => trocaIcon(!cardVisible)}
                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, marginRight: 20 }}>
                    <Ionicons name={icon} size={30} color='red' />
                </TouchableOpacity>
                <View style={{ height: 50 }}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Valor Total da Compra </Text>

                    <Text style={{ color: 'red', fontWeight: 'bold' }}>{totalValue.toFixed(2).replace('.', ',')} </Text>
                </View>
                <View style={{ margin: 10 }}>
                    {
                        cardVisible
                            ?
                            <View />
                            :
                            <View>
                                {/* style={{  height: 250}}> */}
                                <TextInput
                                    mode='outlined'
                                    // name='obsevacao'
                                    placeholder='Observação'
                                    style={style.input}
                                    value={observacao}
                                    onChangeText={(txt) => onChange(txt)}
                                />
                                <Button title="Dados para entrega" buttonStyle={{ marginTop: 15 }} onPress={() => finalizar()} />
                            </View>
                    }
                </View>

            </Card>

        </View >
    )
}

const style = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        textAlign: 'center',
        marginTop: 20,
        margin: 10,
        borderRadius: 50,
        borderWidth: 7,
        borderColor: 'transparent',
        height: 40,
    },
})