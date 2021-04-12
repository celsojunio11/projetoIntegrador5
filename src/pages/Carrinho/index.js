import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'


import firebase from '../../services/firebaseConection'
import { StyleSheet } from 'react-native'


export default function cart({ navigation }) {

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


    async function finalizar() {
        let novoCarrinho = []
        const dataAtual = new Date() // para salvar como timestamp

        cart.map((x) => {
            novoCarrinho.push(
                { nome: x.nome, quantidade: x.quantidade }) // pra pegar só nome e quantidade
        })

        const dados = {
            idCliente: firebase.auth().currentUser.uid,
            data: dataAtual,
            itens: novoCarrinho,
            observacao: '',
            finalizado: false
        }

        await firebase.firestore().collection('pedido').add(dados)
            .then(
                alert('Pedido cadastrado com sucesso')
            )
            .then(navigation.navigate('Endereco', { idCliente: dados.idCliente }))
            .catch((err) => {
                alert(err)
            })

    }

    const Item = ({ item }) => {

        const st = StyleSheet.create({
            container: { width: '100%', borderRadius: 20 },
            imagem: {
                borderRadius: 50,
                width: 100,
                height: 100,
            },
            title: { textAlign: 'center', marginBottom: 10, textTransform: 'capitalize', fontSize: 18 },
            content: { width: '65%', marginLeft: 50 },
            descricao: { textTransform: 'capitalize', fontSize: 15 },
            quantidade: { textTransform: 'capitalize', fontSize: 15, marginTop: 10 },

            preco: { marginTop: 25, color: 'red', fontWeight: 'bold' }
        })

        const { nome, preco, quantidade, imagem, descricao } = item
        let subtotal = preco * quantidade
        return (
            <View>
                <Card style={st.container}>
                    <Card.Title style={st.title}>{nome}</Card.Title>
                    <Card.Divider />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '20%', marginBottom: 20 }}>
                            <Image
                                style={st.imagem}
                                source={{ uri: imagem }}
                            />
                        </View>
                        <View style={st.content}>
                            <ListItem.Subtitle style={st.descricao}>{descricao}</ListItem.Subtitle>
                            <ListItem.Subtitle style={st.quantidade}>{quantidade}</ListItem.Subtitle>

                            <ListItem.Subtitle style={st.preco}> R$ {preco.toFixed(2).replace('.', ',')}</ListItem.Subtitle>
                            <ListItem.Subtitle style={st.subtotal}>Subtotal:  R$ {subtotal.toFixed(2).replace('.', ',')}</ListItem.Subtitle>

                        </View>
                    </View>
                    <Card.Divider />
                    <View style={{ alignItems: 'flex-end' }}>
                        <View style={{ flexDirection: 'row', width: "100%", marginTop: 15 }}>

                            <TouchableOpacity>
                                <Ionicons name='close-circle' size={30} onPress={() => { removeItem(item) }} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { remove(item) }} >
                                <Ionicons name='remove-circle' size={30} color='#dc3545' />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { add(item) }}>
                                <Ionicons name='add-circle' size={30} color='#198754' />
                            </TouchableOpacity>

                        </View>
                    </View>
                </Card>
            </View>

        )
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
            <Card>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Valor Total da Compra </Text>

                <Text style={{ color: 'red', fontWeight: 'bold' }}>{totalValue.toFixed(2).replace('.', ',')} </Text>
            </Card>
            <Button title="Dados para entrega" buttonStyle={{ marginTop: 15 }} onPress={finalizar} />

        </View>

    )
}