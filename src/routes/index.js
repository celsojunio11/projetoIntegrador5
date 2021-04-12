// importacao react
import * as React from 'react';
import { Text, View } from 'react-native'

// importacao react navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

// importacao context
import CartProvider, { useCart } from '../contexts/cart'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
// importacao das páginas
import { Inicio, Cadastro, Login, Carrinho, HomeApp, Endereco, Mapa, Config, Notificacao, Success, ListarProduto, CadastrarProduto, AtualizarProduto, PadariasParceiras, PadariaDetalhes } from '../pages'

// importacao do drawer personalizado
import CustomDrawer from '../components/Drawer'


function IconWithBadge(focused) {
    const { color, size, focused: focus } = focused

    const { cart } = useCart();

    return (
        <View style={{ height: 24, width: 24, margin: 5, alignContent: 'center', justifyContent: 'center' }}>

            {focus ?
                <Ionicons name={'cart'} size={size} color={color} />
                :
                <Ionicons name={'cart-outline'} size={size} color={color} />
            }

            {cart.length != 0 &&
                <Badge
                    containerStyle={{ position: 'absolute', top: -4, right: -9 }}
                    value={Object.keys(cart).length} status="primary"
                />
            }

        </View>
    )
}


const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const Drawer = createDrawerNavigator()

function CarrinhoStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Carrinho" component={Carrinho} />
            <Stack.Screen name="Endereco" component={Endereco} />
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

function PadariaDrawer() {
    return (
        <CartProvider>
            <Drawer.Navigator
                drawerContent={(props) => CustomDrawer(props)}>

                <Drawer.Screen name="Carrinho" component={PadariaTab} />
                <Drawer.Screen name="Produtos" component={ProdutoStack} />
                <Drawer.Screen name="Notificacao" component={Notificacao} />
                {/* <Drawer.Screen name="Config" component={Config} /> */}

                {/* <Drawer.Screen name="Detalhes" component={PadariaDetalhes} />
                <Drawer.Screen name="Padaria" component={PadariasParceiras} />
                <Drawer.Screen name="Mapa" component={Mapa} /> */}
                <Drawer.Screen name="Sair" component={AutenticacaoStack} />


            </Drawer.Navigator>
        </CartProvider>

    )
}

function PadariaTab() {
    return (
        <CartProvider>
            <Tab.Navigator

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'Carrinho') {
                            iconName = focused
                                ? 'cart'
                                : 'cart-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#E22C43',
                    inactiveTintColor: 'gray',
                }}
            >
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
            <Stack.Screen name="Logado" component={PadariaDrawer} />
            <Stack.Screen name="Success" component={Success} />
        </Stack.Navigator>
    )
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Autenticacao" component={AutenticacaoStack} />
                <Stack.Screen name="Padaria" component={PadariaDrawer} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App