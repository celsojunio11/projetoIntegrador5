import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'


export default function cart(navigation) {

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

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} isHome={true} title={'Carrinho'} />

            <Button title="Limpar Carrinho" onPress={clear} />
            <ScrollView>
                <FlatList
                    data={cart}
                    contentContainerStyle={{ flex: 1, width: '100%', padding: 10 }}
                    keyExtractor={(item) => { item.id }}
                    renderItem={({ item }) => {
                        return (
                            <Card>
                                <Card.Title>{item.nome}</Card.Title>
                                <Card.Divider />
                                <Image
                                    style={{
                                        width: 80,
                                        height: 100,
                                    }}
                                    source={{ uri: item.imagem }}
                                />
                                <Card.Divider />

                                <View style={{ flexDirection: 'row', width: "100%", marginTop: 15 }}>
                                    <Button title='-' buttonStyle={{ marginLeft: 15 }} onPress={() => { remove(item) }} />
                                    <Button title='+' buttonStyle={{ marginLeft: 15 }} onPress={() => { add(item) }} />
                                </View>
                                <View style={{ marginLeft: 50 }}>
                                    <Text>{item.descricao}</Text>
                                    <Text>QTD: {item.quantidade}</Text>

                                    <Text>R$ {item.preco}</Text>
                                    <Text>SubTotal: R$ {item.preco * item.quantidade} </Text>
                                </View>
                                <Card.Divider />

                                <View style={{ flexDirection: 'row', }}>
                                    <Button title='Remover ao carrinho' buttonStyle={{ marginLeft: 15 }} onPress={() => { removeItem(item) }} />

                                    {/* <Button buttonStyle={{ backgroundColor: "#F7DE45" }} title="Atualizar Produto" onPress={() => navigation.navigate("AtualizarProduto", { data: item })} />
                                    <Button buttonStyle={{ marginLeft: 25, backgroundColor: "#E82D30" }} title="Deletar Produto" onPress={() => DeleteProduct(item.id)} /> */}
                                </View>
                            </Card>
                        )
                    }}
                />

            </ScrollView>
            <Text>Valor Total: {totalValue} </Text>
        </View>

    )
}