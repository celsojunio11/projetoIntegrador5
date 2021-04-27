import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper'

interface PadariaProps {
    id: string,
    nome: string,
    telefone: string,
    email: string,
}

interface CardProduto {
    renderItem: PadariaProps,
    action?: () => void,
    buttonTitle?: string
}
export function CardPadaria({ renderItem, action, buttonTitle }: CardProduto) {


    const { nome, telefone, email, } = renderItem

    return (
        <Card style={st.container}>

            <View style={{ flexDirection: 'row' }}>
                {/* <View style={{ marginRight: 20 }}>
                        <Image
                            style={st.imagem}
                            source={{ uri: imagem }}
                        />
                    </View> */}
                <View>
                    <Title>{nome}</Title>
                    <Paragraph style={st.descricao}>{email}</Paragraph>
                    <Paragraph style={st.descricao}>{telefone}</Paragraph>
                </View>
            </View>



        </Card>
    )
}


const st = StyleSheet.create({
    container: { borderRadius: 20, margin: 10, padding: 10 },
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