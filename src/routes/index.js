// importacao react
import * as React from 'react';
import { Text, View } from 'react-native'

// importacao react navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';

// importacao context
import CartProvider, { useCart } from '../contexts/cart'

// importacao das páginas
import { Inicio, Cadastro, Login, Carrinho, HomeApp, Success, ListarProduto, CadastrarProduto, AtualizarProduto } from '../pages'


function IconWithBadge() {

    const { cart } = useCart();

    return (
        <View style={{ height: 24, width: 24, margin: 5, alignContent: 'center', justifyContent: 'center' }}>
            <Text>{Object.keys(cart).length}</Text>
        </View>
    )
}


const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

function CarrinhoStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Carrinho" component={Carrinho} />
        </Stack.Navigator>
    )
}

function ProdutoStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="ListarProduto" component={ListarProduto} />
            <Stack.Screen name="CadastrarProduto" component={CadastrarProduto} />
            <Stack.Screen name="AtualizarProduto" component={AtualizarProduto} />
        </Stack.Navigator>
    )
}

function Padaria() {
    return (
        <CartProvider>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name == 'Produto') {
                        iconName = focused
                            ? 'home'
                            : 'home'
                    } else if (route.name == 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home'
                    }
                    return <IconEntypo name={iconName} size={30} color={color} />
                }
            })}
                tabBarOptions={{
                    activeTintColor: '#f00',
                    inactiveTintColor: '#0B2031',
                }}
            >
                <Tab.Screen name="Produto" component={ProdutoStack} />
                <Tab.Screen name="Home" component={HomeApp} />
                <Tab.Screen name="Carrinho" component={CarrinhoStack} options={{ tabBarIcon: IconWithBadge }} />
            </Tab.Navigator>
        </CartProvider>
    )
}

function AutenticacaoStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Logado" component={Padaria} />
            <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
    )
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Autenticacao" component={AutenticacaoStack} />
                <Stack.Screen name="Padaria" component={Padaria} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App