import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, TextInput } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useCart } from '../contexts/carrinhoContext'
import Header from '../components/Header'
import firebase from '../services/firebaseConection'
import { useNavigation } from '@react-navigation/core'
import { CardProdutoCarrinho } from '../components/CardProdutoCarrinho'
import { useAutenticacao } from '../contexts/autenticacaoContext'

interface ProdutoProps {
    id?: string, // ?opcional
    nome: string,
    quantidade: number,
}

export function Carrinho() {

    const navigation = useNavigation()
    const { usuario } = useAutenticacao()
    const { adicionar, remover, carrinho, total, removerItem } = useCart()

    const [observacao, setObservacao] = useState<string>('')
    const [cardVisible, setCardVisible] = useState<boolean>(true)
    const [icon, setIcon] = useState('chevron-up-circle-outline')

    const trocaIcon = (icon: boolean) => {
        icon ? setIcon('chevron-up-circle-outline')
            : setIcon('chevron-down-circle-outline')
        setCardVisible(icon)
    }



    async function finalizar() {
        let novoCarrinho = [] as ProdutoProps[];

        const dataAtual = new Date() // para salvar como timestamp

        carrinho.map((x: any) => {
            novoCarrinho.push(
                { nome: x.nome, quantidade: x.quantidade }) // pra pegar só nome e quantidade
        })

        const dados = {
            idCliente: usuario,
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


    if (!carrinho || carrinho.length === 0) {
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
                data={carrinho}
                showsVerticalScrollIndicator={false}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => (
                    <CardProdutoCarrinho
                        renderItem={item}
                        adicionar={() => adicionar(item)}
                        remover={() => remover(item)}
                        deletar={() => removerItem(item)}
                    />
                )}
            />

            <Card style={{ margin: 10, paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => trocaIcon(!cardVisible)}
                    style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 15, marginRight: 20 }}>
                    <Ionicons name={icon} size={30} color='red' />
                </TouchableOpacity>
                <View style={{ height: 50, marginLeft: 20 }}>
                    <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>Valor Total da Compra </Text>

                    <Text style={{ color: 'red', fontWeight: 'bold' }}>{total.toFixed(2).replace('.', ',')} </Text>
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
                                {/* button: {marginTop: 15, backgroundColor: "#E22C43", alignItems: 'flex-end' } */}
                                <Button title="Dados para entrega" buttonStyle={{ marginTop: 5, borderRadius: 20, padding: 10 }} onPress={() => finalizar()} />
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
        // margin: 10,
        borderRadius: 50,
        borderWidth: 0.1,
        borderColor: 'transparent',
        height: 40,
    },
})