import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export default function CartProvider({ children }) {

    const [cart, setCart] = useState([])
    const [totalValue, setTotalValue] = useState()


    useEffect(() => {

        let value = 0
        cart.map((item) => {
            value = value + item.preco * item.quantidade
        })
        setTotalValue(value)
        
    }, [cart])



    function clear() {
        setCart([])
    }

    // function add(item) {
    //     const newCart = cart
    //     newCart.push(item)
    //     setCart([...newCart])
    // }

    // function remove(index) {
    //     let newCart = cart;
    //     delete newCart[index]
    //     setCart([...newCart])
    // }


    function add(item) {
        // verifica se o produto não está no carrinho
        const exist = cart.find((x => x.id === item.id))

        // se tiver o produto, percorre o array de produtos e adiciona 1, no produto que está sendo adiciona
        if (exist) {
            setCart(
                cart.map((x) =>
                    x.id === item.id ? { ...exist, quantidade: exist.quantidade + 1 } : x
                )
            )
            // se não tiver adiciona com quantidade 1
        } else {
            setCart([...cart, { ...item, quantidade: 1 }])
        }
    }

    function remove(item) {
        // verifica se o produto não está no carrinho
        const exist = cart.find((x => x.id === item.id))

        if (exist.quantidade === 1) {
            setCart(
                cart.filter((x) => x.id !== item.id)
            )
        } else {
            setCart(
                cart.map((x) =>
                    x.id === item.id ? { ...exist, quantidade: exist.quantidade - 1 } : x
                )
            )
        }
    }

    function removeItem(item) {
        setCart(
            cart.filter((x) => x.id !== item.id)
        )
    }

    // Para o context ter acesso a todas as funções
    const store = { cart, totalValue, add, remove, clear, removeItem }

    return (
        <CartContext.Provider value={store}>
            {children}
        </CartContext.Provider>
    )
}

// criando um hook para utilizar no restante do app
export function useCart() {

    const context = useContext(CartContext)

    const { cart, totalValue, add, remove, removeItem, clear } = context

    return { cart, totalValue, add, remove, removeItem, clear }
}

// https://www.youtube.com/watch?v=AmIdY1Eb8tY