import React from 'react'
import { TouchableOpacity, ScrollView, SafeAreaView, Text, StyleSheet, View } from 'react-native'
import firebase from '../services/firebaseConection'

function CustomDrawer(props) {

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView style={{ paddingLeft: 15, backgroundColor: "#DCDCDC" }}>
                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Carrinho') }}>
                    <Text style={{ fontSize: 25 }}>Carrinho</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Produtos') }}>
                    <Text style={{ fontSize: 25 }}>Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Produtos') }}>
                    <Text style={{ fontSize: 25 }}>Padarias Parceiras</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { props.navigation.navigate('Notificacao') }}>
                    <Text style={{ fontSize: 25 }}>Notificação</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default CustomDrawer