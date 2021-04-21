import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native'

export function Finalizar() {
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation()

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