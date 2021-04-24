import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
}

interface CardProduto {
    renderItem: ProdutoProps,
    action?: () => void
}
export function CardProduto({ renderItem, action }: CardProduto) {

    const st = StyleSheet.create({
        container: { borderRadius: 20, margin: 10, paddingBottom: 10 },
        imagem: {
            borderRadius: 50,
            width: 100,
            height: 100,
        },
        title: { marginLeft: 5, marginBottom: 10, textTransform: 'capitalize', fontSize: 24 },
        content: { width: '65%', marginLeft: 50 },
        descricao: { marginLeft: 5, textTransform: 'capitalize', fontSize: 15 },
        preco: { marginTop: 25, color: 'red', fontWeight: 'bold' },
        button: { backgroundColor: "#E22C43", alignItems: 'flex-end', borderRadius: 20, padding: 10 }
    })

    const { nome, descricao, imagem, preco, } = renderItem

    return (
        <Card style={st.container}>
            <Card.Content>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 20 }}>
                        <Image
                            style={st.imagem}
                            source={{ uri: imagem }}
                        />
                    </View>
                    <View>
                        <Title>{nome}</Title>
                        <Paragraph style={st.descricao}>{descricao}</Paragraph>
                        <Paragraph style={st.preco}> R$ {preco.toFixed(2).replace('.', ',')}</Paragraph>
                    </View>
                </View>
            </Card.Content>
            {action &&
                <Card.Actions style={{ justifyContent: 'flex-end', marginTop: 10 }}>
                    <Button buttonStyle={st.button} title="Adicionar ao Carrinho" onPress={action} />
                </Card.Actions>
            }

        </Card>
    )
}