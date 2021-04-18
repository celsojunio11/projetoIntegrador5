import React from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
import { TouchableOpacity, ScrollView, SafeAreaView , StyleSheet} from 'react-native'

//https://oblador.github.io/react-native-vector-icons/
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';


function CustomTabBar(props) {//{ title, isHome, navigation }) {


    const { state, navigation } = props

    const { routeNames } = state

    console.log(routeNames)
    // screenOptions={({ route }) => ({
    //   tabBarIcon: ({ focused, color, size }) => {
    //     let iconName;

    //     if (route.name === 'Home') {
    //       iconName = focused
    //         ? 'home'
    //         : 'home-outline';
    //     } else if (route.name === 'Carrinho') {
    //       iconName = focused
    //         ? 'cart'
    //         : 'cart-outline';
    //     }

    //     return <Ionicons name={iconName} size={size} color={color} />;
    //   },
    // })}
    // tabBarOptions={{
    //   activeTintColor: '#E22C43',
    //   inactiveTintColor: 'gray',
    // }}

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ paddingLeft: 15, backgroundColor: "#fff" }}>

                {routeNames.map((item) =>
                    <TouchableOpacity onPress={() => navigation.navigate(item)} style={{ flex: 1 }}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{item}</ListItem.Title>
                                <ListItem.Chevron color="white" />
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "#0B2031",
    },

    constainerTitle: {
        flex: 1.5,
        justifyContent: 'center',
    },

    title: {
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default CustomTabBar;