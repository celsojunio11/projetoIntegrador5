import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, ScrollView, Image, Dimensions, PermissionsAndroid } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import firebase from '../../services/firebaseConection'

// USANDO API DE TESTE
import api from '../../services/apiMapaSaude'



import Header from '../../components/Header'


import styles from './styles'

const { width, height } = Dimensions.get('window')

export default function Padaria({ navigation }) {

    const [padaria, setPadaria] = useState([])
    const [ponto, setPonto] = useState([])

    const [origem, setOrigem] = useState({
        latitude: -18.5917875,
        longitude: -46.6660613,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    })

    const raio = 15

    const getPontos = async () => {
        const { data } = await api.get(`rest/estabelecimentos/latitude/${origem.latitude}/longitude/${origem.longitude}/raio/${raio}`)

        setPonto(data)
    }

    const getPadarias = async () => {
        try {
            await firebase.firestore().collection('padaria').get().then((querySnapshot) => {
                const data = []
                querySnapshot.forEach(doc => {
                    data.push({
                        ...doc.data(),
                        id: doc.id
                    })

                })
                setPadaria(data)

            })
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getPadarias() // buscando padarias do firebase

        getPontos() // buscando postos de saude da api 
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header title={'Padarias Parceiras'} navigation={navigation} isHome={true} />

            <MapView style={{ flex: 1, height, width }}
                showsUserLocation={true}
                enablePoweredByContainer={false}
                region={origem}
            >
                <Marker title='Minha Posição' coordinate={origem} />

                {ponto.map((item, i) => {

                    return (
                        <Marker key={i}
                            title={item.nomeFantasia}
                            coordinate={{ latitude: item.lat, longitude: item.long }}
                            onPress={() => navigation.navigate('Detalhes', { data: item })}
                        />

                    )
                })}
            </MapView>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: 'bold' }}>Padarias Cadastradas</Text>

                {padaria.map((item) => {
                    return (
                        <View>
                            <Text>{item.nome}</Text>

                        </View>
                    )
                })}
            </View>


        </View>
    )
}
