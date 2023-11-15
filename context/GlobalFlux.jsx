'use client'

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            cart: []
        },
        actions: {
            addToCart: (product) => {

                const { cart } = getStore();

                let isOnCart = cart.filter((item) => item.id == product.id)

                if (isOnCart.length == 0) {
                    // Si ya existe en favoritos, eliminar de la lista
                    setStore({ cart: cart.concat(product) })
                } else {

                    getActions().deleteFromCart(product);
                }
                getActions().saveLocalFavorites();

            },
            deleteFromCart: (product) => {

                const { cart } = getStore();

                setStore({ cart: cart.filter(item => item.id !== product.id) })

                getActions().saveLocalStorageCartItem();

            },
            saveLocalStorageCartItem: () => {
                const { cart } = getStore();

                localStorage.setItem('cart', JSON.stringify(cart))
            }
        }
    }
}
export default getState;