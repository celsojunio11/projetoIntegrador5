import React from 'react'
import { View, Text, Image } from 'react-native'

import { Button, Card } from 'react-native-elements'

export default function CustomCard({ render, buttonTitle, action, execute }) {

    const { descricao, id, imagem, nome, preco } = render

    return (
        <>
            <Card style={{ width: '100%', borderRadius: 20 }}>
                <Text style={{ fontSize: 15, marginBottom: 12, textAlign: 'center' }}>{nome}</Text>
                <Card.Divider />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '20%' }}>
                        <Image
                            style={{
                                borderRadius: 50,
                                width: 100,
                                height: 100,
                            }}
                            source={{ uri: imagem }}
                        />
                    </View>
                    <View style={{ width: '65%', marginLeft: 50 }}>
                        <Text>{descricao}</Text>
                        <Text style={{ marginTop: 25 }}> R$ {preco.toFixed(2).replace('.', ',')}</Text>

                    </View>
                </View>
                {action && <View>
                    <Card.Divider style={{ marginTop: 25 }} />
                    <Button buttonStyle={{ backgroundColor: "#2089dc" }} title={buttonTitle} onPress={(id) => execute(id)} />

                </View>
                }


            </Card>
        </>
    )

}














