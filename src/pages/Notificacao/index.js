import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header'

function Notificacao({ navigation }) {

    return (
        <View style={{ flex: 1 }}>

            <Header title={'Notificações'} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text>Notificacao</Text>
            </View>
        </View>
    )
}

export default Notificacao;