import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, FlatList } from 'react-native'
import { Searchbar, } from 'react-native-paper'
import { useCart } from '../../contexts/cart'
import Header from '../../components/Header'
import { CardProduto } from '../../components/CardProduto'
import { ButtonCard } from '../../components/ButtonCard'
import firebase from '../../services/firebaseConection'


interface ProdutoProps {
    id: string,
    nome: string,
    descricao: string,
    imagem: string,
    preco: number,
    categoria: string,
}

export function PesquisarProduto() {

    const navigation = useNavigation()
    const routes = useRoute()

    const { categoria }: any = routes.params

    const [data, setData] = useState<[ProdutoProps]>([] as any)
    const [filteredData, setFilteredData] = useState<[ProdutoProps]>()
    const [categorias, setCategorias] = useState([] as string[]);
    const [z, setCategoria] = useState<string>(categoria);
    const [pesquisa, setPesquisa] = useState<string>('');

    const pesquisar = async (search: string) => {
        setPesquisa(search)
        const filtrados = [] as any;
        data.filter((produto) => {
            if (produto.descricao == search) {
                filtrados.push(produto)
            }
        })
        setFilteredData(filtrados)
    };

    const filtrar = async (search: string) => {
        if (search === 'Todos') {
            setCategoria(search)
            return setFilteredData(data)
        }
        else {
            const filtrados = [] as any;
            data.filter((produto) => {
                if (produto.categoria == search) {
                    filtrados.push(produto)
                }
            })
            setFilteredData(filtrados)
            setCategoria(search)
        }
    }

    const getProduct = async () => {
        const data = [] as any;
        const categorias = ['Todos'] as any;

        await firebase.firestore().collection('produto')
            .onSnapshot(
                querySnapshot => {
                    querySnapshot.forEach(doc => {
                        // array de produtos
                        data.push({
                            ...doc.data(),
                            id: doc.id
                        })

                        //para usar como filtro
                        categorias.push(
                            doc.data().categoria,
                        )
                    })

                    const categoriaFiltradas = [...new Set(categorias)];

                    setCategorias(categoriaFiltradas as string[])
                    setData(data)
                    //    setFilteredData(data)
                },
                error => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        getProduct()

    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header navigation={navigation} isHome={true} title='Produtos' />

            <Searchbar
                placeholder="Digite para pesquisar"
                style={{ margin: 10 }}
                value={`${pesquisa}`}
                onChangeText={(value) => pesquisar(value)}
            />
            <View style={{ marginBottom: 10 }}>

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categorias}
                    keyExtractor={(item: string) => item}
                    renderItem={({ item }) => (
                        <ButtonCard active={item === z} renderItem={item} action={() => filtrar(item)} />
                    )}

                />
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                renderItem={({ item }) => (<CardProduto renderItem={item} />)}
                keyExtractor={({ id }) => id}
            />

        </View>
    )

}