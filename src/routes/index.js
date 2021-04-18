// importacao react
import * as React from 'react';
import { Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper';

// importacao react navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';


//importacao das páginas
// Autenticacao
import Inicio from '../pages/Inicio'
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';

//Carrinho
import Carrinho from '../pages/Carrinho';
import HomeApp from '../pages/HomeApp'
import Finalizar from '../pages/Finalizar'
import Endereco from '../pages/Endereco'

import EnderecoNovo from '../pages/Endereco/EnderecoNovo'
import EnderecoPadrao from '../pages/Endereco/EnderecoPadrao'

//Produto
import ListarProduto from '../pages/Produto/ListarProduto'
import PesquisarProduto from '../pages/Produto/PesquisarProduto'

import Notificacao from '../pages/Notificacao'
import Config from '../pages/Config'

import Mapa from '../pages/Mapa'

import PadariasParceiras from '../pages/Padaria'
import PadariaDetalhes from '../pages/PadariaDetalhes'


// importacao context
import CartProvider, { useCart } from '../contexts/cart'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
// importacao das páginas

// importacao do drawer personalizado
import CustomDrawer from '../components/Drawer'
import CustomTabBar from '../components/TabBar'




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
      <Stack.Screen name="Home" component={HomeApp} />
      <Stack.Screen name="Endereco" component={Endereco} />
      <Stack.Screen name="Mapa" component={Mapa} />

      <Stack.Screen name="EnderecoPadrao" component={EnderecoPadrao} />
      <Stack.Screen name="EnderecoNovo" component={EnderecoNovo} />
    </Stack.Navigator>
  )
}

function ProdutoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="ListarProduto" component={ListarProduto} />
      <Stack.Screen name="PesquisarProduto" component={PesquisarProduto} />
    </Stack.Navigator>
  )
}

function PadariaDrawer() {
  return (

    <CartProvider>
      <PaperProvider>
        <Drawer.Navigator>
          {/* drawerContent={(props) => CustomDrawer(props)}> */}

          <Drawer.Screen name="Carrinho" component={PadariaTab} />
          <Drawer.Screen name="Produtos" component={ProdutoStack} />
          <Drawer.Screen name="Notificacao" component={Notificacao} />
          {/* <Drawer.Screen name="Config" component={Config} /> */}

          {/* <Drawer.Screen name="Detalhes" component={PadariaDetalhes} />
                <Drawer.Screen name="Padaria" component={PadariasParceiras} />
                <Drawer.Screen name="Mapa" component={Mapa} /> */}
          <Drawer.Screen name="Sair" component={AutenticacaoStack} />


        </Drawer.Navigator>
      </PaperProvider>
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
        {/* tabBar={props => CustomTabBar(props)}> */}
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