import React from 'react'
import { View, Text } from 'react-native'

import Header from '../../components/Header'

function Finalizar({ navigation, route }) {

    return (
        <View>
            <Header navigation={navigation} />
            <Text>Finalizar</Text>
        </View>
    )

}

export default Finalizar