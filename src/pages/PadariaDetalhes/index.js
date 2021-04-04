import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header'

function PadariaDetalhes({ navigation, route }) {
    const { data } = route.params
    // console.log(data)


    return (
        <View style={{ flex: 1 }}>

            <Header title={'Detalhes da Padaria'} navigation={navigation} />
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Text>Cidade: {data.cidade}</Text>
                <Text>Nome Fantasia: {data.nomeFantasia}</Text>
                <Text>categoria: {data.categoriaUnidade}</Text>
            </View>
        </View>
    )
}

export default PadariaDetalhes;