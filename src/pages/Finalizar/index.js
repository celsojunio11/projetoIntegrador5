import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { BottomSheet, ListItem } from 'react-native-elements'
import Header from '../../components/Header'

function Finalizar({ navigation, route }) {
    const [isVisible, setIsVisible] = useState(false);
    const list = [
        { title: 'List Item 1' },
        { title: 'List Item 2' },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];
    return (
        <View>
            <Header navigation={navigation} />
            <Text>Finalizar</Text>
        </View>
    )

}

export default Finalizar