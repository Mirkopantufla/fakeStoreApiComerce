'use client'

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            cart: []
        },
        actions: {
            handleFormChange: (e) => {
                let { name, value } = e.target;

                setStore({ [name]: value })
            },
            handleFormCheckbox: (e) => {
                let { name, checked } = e.target;

                setStore({ [name]: checked })
            },
            registerUser: async (e) => {

                const { registerEmail, registerRut_number, registerFirst_name, registerLast_name, registerPhone_number, registerPassword, registerRepeatPassword, registerTermsAndCoinditions } = getStore();

                console.log("hola")
                e.preventDefault()

                const formData = {
                    email: registerEmail,
                    rut_number: registerRut_number,
                    first_name: registerFirst_name,
                    last_name: registerLast_name,
                    phone_number: registerPhone_number,
                    password: registerPassword,
                    repeatPassword: registerRepeatPassword,
                    terms_conditions: registerTermsAndCoinditions
                }

                console.log(formData)

                const fetchOptions = {
                    apiURL: "http://127.0.0.1:5000/api/users/register",
                    options: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    }
                }


                try {

                    const respJson = await fetch(fetchOptions.apiURL, fetchOptions.options);
                    const data = await respJson.json();

                    console.log(data)

                } catch (error) {
                    console.log(error)
                }

            },
            addToCart: (product) => {

                const { cart } = getStore();

                let isOnCart = cart.filter((item) => item.id == product.id)

                if (isOnCart.length == 0) {
                    //Seteo en el carrito el producto
                    setStore({ cart: cart.concat(product) })
                } else {
                    // Si ya existe en favoritos, eliminar de la lista
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