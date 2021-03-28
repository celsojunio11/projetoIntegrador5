
import * as React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import style from './styles'

export default function HomeScreen({ navigation }) {

    return (
        <View style={style.container}>
            <ImageBackground
                source={require('../../assets/imagemFundo/fundo.jpeg')}
                style={style.image}
            >

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', ImageBackground }}>

                    <View style={{ marginBottom: 100 }}>
                        <Text style={style.text}>Padaria </Text>
                        <Text style={style.text}>Delivery</Text>
                    </View>

                    <View style={{ marginBottom: 8 }}>
                        <Button buttonStyle={style.button} title="Entrar com email" onPress={() => navigation.navigate('Login')} />
                    </View>

                    <View style={{ marginBottom: -40 }}>
                        <Button buttonStyle={style.buttonCadastro} title="Criar conta gratuita" onPress={() => navigation.navigate('Cadastro')} />
                    </View>

                </View>
            </ImageBackground>
        </View>

    );
}