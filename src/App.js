import * as React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Cadastro from './pages/Cadastration';
import Login from './pages/Login';

function HomeScreen({ navigation }) {

  const style = StyleSheet.create({
    button: {
      backgroundColor: '#f00',
      borderRadius: 100,
      borderWidth: 8,
      borderColor: '#f00',
      width: 300,
      margin: 1,
      justifyContent: 'center',
      marginBottom: -15

    },

    buttonCadastro: {
      backgroundColor: 'transparent',
      borderRadius: 100,
      borderWidth: 5,
      borderColor: 'transparent',
      width: 300,
      margin: 1,
      justifyContent: 'center',

    },

    text: {
      color: 'white',
      fontSize: 50,
      fontWeight: 'bold'


    },

    container: {
      flex: 1,
      flexDirection: 'column'
    },

    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      alignItems: 'center'
    },

  })


  return (
    <View style={style.container}>
      <ImageBackground
        source={require('./assets/imagemFundo/fundo.jpeg')}
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

const Stack = createStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* //component={HomeScreen}  */}
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;