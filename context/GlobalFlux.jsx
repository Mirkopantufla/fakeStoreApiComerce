'use client'

import { isAuthenticated } from "@/utils/auth";
import { baseURL } from "@/utils/paths";
import { toast, Flip } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            access_token: undefined,
            user: [],
            cart: [],
            categories: [],
            products: []
        },
        actions: {
            handleFormChange: (e) => {
                let { name, value } = e.target;

                setStore({ [name]: value })
            },
            addToCart: (product) => {

                const { cart } = getStore();

                let productsOnCart = cart.filter((item) => item.product_id == product.product_id)

                if (productsOnCart.length == 0) {
                    //Seteo en el carrito el producto
                    setStore({ cart: cart.concat(product) })
                    toast.success(`${product.title} agregado al carrito`, { autoClose: 1500, transition: Flip })
                } else {
                    // Si ya existe en favoritos, eliminar de la lista
                    getActions().deleteFromCart(product);
                }
                getActions().saveLocalStorageCartItem();

            },
            deleteFromCart: (product) => {

                const { cart } = getStore();

                setStore({ cart: cart.filter(item => item.product_id !== product.product_id) })

                toast.warning(`${product.title} quitado del carrito`, { autoClose: 1500, transition: Flip })

                getActions().saveLocalStorageCartItem();

            },
            saveLocalStorageCartItem: () => {
                const { cart } = getStore();

                localStorage.setItem('cart', JSON.stringify(cart))
            },
            getLocalProducts: () => {
                let localProducts = localStorage.getItem('cart');

                setStore({ cart: JSON.parse(localProducts) })
            },
            getProductCategories: async () => {
                // Hago un fetch para traer todas las categorias desde el backend
                // y esta la utilizo en el global context, para que se carguen desde el inicio de la pagina
                try {

                    const respJson = await fetch(`${baseURL}/products/categories`);
                    const data = await respJson.json();

                    // Las guardo en categories (store.categories)
                    setStore({ categories: [...data] });

                } catch (error) {
                    toast.error(`Ha ocurrido un error con getProductCategories: ${error}`, { autoClose: 2000 })
                }

            },
            getAllProducts: async () => {
                // Hago un fetch para traer todas los productos desde el backend
                // y esta la utilizo en el global context, para que se carguen desde el inicio de la pagina
                try {
                    const responseJson = await fetch(`${baseURL}/products`)
                    const data = await responseJson.json()

                    setStore({ products: data })
                } catch (error) {
                    toast.error(`Ha ocurrido un error con getAllProducts: ${error}`, { autoClose: 2000 })
                }

            },
            saveLoginFetchData: (access_token, userData) => {

                setStore({ access_token: access_token, user: userData })

                localStorage.setItem('user', JSON.stringify(userData))
                localStorage.setItem('access_token', JSON.stringify(access_token))

            },
            chargeDataFromLocal: () => {

                if (localStorage.getItem('access_token')) {
                    const token = JSON.parse(localStorage.getItem('access_token'))
                    const userData = JSON.parse(localStorage.getItem('user'))

                    setStore({ access_token: token, user: userData });
                }

            },
            deleteUserData: () => {
                setStore({ access_token: undefined, user: [] });
            },
        }
    }
}
export default getState;