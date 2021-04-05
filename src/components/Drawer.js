import React from 'react'
import { TouchableOpacity, ScrollView, SafeAreaView, Text, StyleSheet, View } from 'react-native'

function CustomDrawer({navigation}) {

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView style={{ paddingLeft: 15, backgroundColor: "#fff" }}>
                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Carrinho') }}>
                    <Text style={{ fontSize: 25 }}>Carrinho</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Produtos') }}>
                    <Text style={{ fontSize: 25 }}>Produtos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Padaria') }}>
                    <Text style={{ fontSize: 25 }}>Padarias Parceiras</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Notificacao') }}>
                    <Text style={{ fontSize: 25 }}>Notificação</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Mapa') }}>
                    <Text style={{ fontSize: 25 }}>Mapa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 35, backgroundColor: 'red' }} onPress={() => { props.navigation.navigate('Sair') }}>
                    <Text style={{ fontSize: 25 }}>Sair</Text>
                </TouchableOpacity>



            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default CustomDrawer