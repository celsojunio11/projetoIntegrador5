import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Card, Title, Paragraph, TextInput } from 'react-native-paper'

import Ionicons from 'react-native-vector-icons/Ionicons'

import { useCart } from '../contexts/cart'
import Header from '../components/Header'


import firebase from '../services/firebaseConection'
import { useNavigation } from '@react-navigation/core'


interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
    quantidade: number,
}

export function Carrinho() {


    const navigation = useNavigation()

    const { clear, add, remove, cart, totalValue, removeItem } = useCart()

    if (cart.length === 0) {
        return (
            <View style={{ flex: 1 }}>
                <Header navigation={navigation} isHome={true} title={'Carrinho'} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                    <Text>Carrinho Vazio</Text>
                </View>
            </View>

        )
    }

    const [observacao, setObservacao] = useState<string>('')
    const [cardVisible, setCardVisible] = useState<boolean>(true)
    const [icon, setIcon] = useState('chevron-up-circle-outline')

    const trocaIcon = (icon: boolean) => {
        icon ? setIcon('chevron-up-circle-outline')
            : setIcon('chevron-down-circle-outline')
        setCardVisible(icon)
    }

    async function finalizar() {
        let novoCarrinho = [] as any;

        const dataAtual = new Date() // para salvar como timestamp

        cart.map((x: any) => {
            novoCarrinho.push(
                { nome: x.nome, quantidade: x.quantidade }) // pra pegar só nome e quantidade
        })

        const dados = {
            idCliente: firebase.auth().currentUser.uid, // erro do ts lint
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


    const Item = ({ item }: { item: ProdutoProps }) => {
        const st = StyleSheet.create({
            container: { borderRadius: 20, margin: 10 },
            imagem: {
                borderRadius: 50,
                width: 100,
                height: 100,
            },
            title: { marginLeft: 5, fontSize: 18 },
            content: { width: '65%', marginLeft: 50 },
            descricao: { marginLeft: 5, fontSize: 15 },
            quantidade: { margin: 20, },
            preco: { marginTop: 25, color: 'red', fontWeight: 'bold', }
        })

        const { id, nome, descricao, imagem, preco, categoria, quantidade } = item
        let subtotal = preco * quantidade

        return (

            <Card style={st.container}>
                <Card.Content>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: 20, flex: 1 }}>
                            <Image
                                style={st.imagem}
                                source={{ uri: imagem }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Title>{nome}</Title>
                            <Paragraph style={st.descricao}>{descricao}</Paragraph>
                            <Paragraph style={st.preco}> R$ {preco.toFixed(2).replace('.', ',')}</Paragraph>

                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginLeft: -50, marginTop: 10 }} >

                                <TouchableOpacity onPress={() => { remove(item) }} >
                                    <Ionicons name='remove-circle' size={30} color='#dc3545' />
                                </TouchableOpacity>

                                <Paragraph style={st.quantidade}>{quantidade}</Paragraph>

                                <TouchableOpacity onPress={() => { add(item) }}>
                                    <Ionicons name='add-circle' size={30} color='#198754' />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>

                            <TouchableOpacity>
                                <Ionicons name='close-circle' size={30} color='#616161' onPress={() => { removeItem(item) }} />
                            </TouchableOpacity>


                        </View>

                    </View>


                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, }}>
                        <Paragraph style={{ margin: 20, color: 'red' }}> R$ {subtotal.toFixed(2).replace('.', ',')}</Paragraph>
                    </View>
                </Card.Content>


            </Card >
        )
    }

    const onChange = (txt: string) => {
        setObservacao(txt)
    }

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} isHome={true} title={'Carrinho'} />

            {/* <Button title="Limpar Carrinho" onPress={clear} /> */}

            <FlatList
                data={cart}
                renderItem={Item}
                keyExtractor={(data) => data.id}
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
        // width: '100%'
    },


})