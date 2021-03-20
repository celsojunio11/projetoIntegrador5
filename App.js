import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './Cadastration';
import Login from './Login';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ textAlign: 'center' }}>Sistema de Cadastro de Login</Text>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;