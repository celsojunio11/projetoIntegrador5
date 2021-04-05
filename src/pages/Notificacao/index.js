import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Header from '../../components/Header'

// notificação
import OneSignal from 'react-native-onesignal'
import config from '../../config/config.json'
import api from '../../services/apiOneSignal'

function Notificacao({ navigation }) {

    useEffect(() => {
        OneSignal.init(config.oneSignal)

        OneSignal.addEventListener('opened', opened)

        // Desmontando componente
        return () => OneSignal.removeEventListener('opened', opened)


    }, [])

    function opened(result) {
        console.log('Mensagem: ', result.notification.payload.body);
        console.log('Result: ', result);
    }



    async function enviarNotificacao() {
        const data = {
            "app_id": "9e0b97f6-b531-4e0b-8296-c7f3617ced15", // PEGA DO ONE SIGNAL
            "included_segments": ["Subscribed Users"], // GRUPO DAS PESSOAS QUE VÃO RECEBER NOTIFICACAO
            "contents": { "en": "Descrição da mensagem" }, // CORPO DA NOTIFICACAO
            "headings": { "en": "Titulo da mensagem" } // TITULO DA NOTIFICACÃO
        }
        await api.post('/notifications', data)
    }


    return (
        <View style={{ flex: 1 }}>

            <Header title={'Notificações'} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Text>Notificacao</Text>
                <Button title="Enviar Notificação" onPress={enviarNotificacao} />
            </View>
        </View>
    )
}

export default Notificacao;