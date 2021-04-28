import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header'

export function PadariaDetalhes() {
    const navigation = useNavigation()
    const route = useRoute()
    const { data }: any = route.params

    return (
        <View style={{ flex: 1 }}>

            <Header title={'Detalhes da Padaria'} navigation={navigation} />


            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>Padarias Testes</Text>

                <Text>Cidade: {data.cidade}</Text>
                <Text>Nome Fantasia: {data.nomeFantasia}</Text>
                <Text>categoria: {data.categoriaUnidade}</Text>
            </View>
        </View>
    )
}
