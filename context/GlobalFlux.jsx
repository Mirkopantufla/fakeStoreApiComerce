'use client'

import { soloLetras, soloNumeros, solocorreos } from "@/utils/regexStore";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            cart: [],
            registerForm: [

            ]
        },
        actions: {
            handleFormChange: (e) => {
                let { name, value, checked } = e.target;
                const { validateFormData } = getActions();

                if (name === "registerTermsAndCoinditions") {
                    setStore({ [name]: checked })
                } else {
                    setStore({ [name]: value })
                }

                validateFormData(e);
            },
            validateFormData: (e) => {
                let { name, value, checked, nextElementSibling } = e.target;
                let hasError = false;

                //-------------------------------------------------------------------------------
                if (name === "registerEmail") {

                    //Validando el Email, Primero si esta vacio y despues con un formato de correo
                    if (value === "") {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        nextElementSibling.innerHTML = "El campo de correo no puede quedar vacio";
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                        return console.log("vacio registerEmail: " + hasError);

                    } else if (!solocorreos.test(value)) {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        nextElementSibling.innerHTML = "El campo de correo debe tener un formato correcto";
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                        return hasError;
                    } else {
                        hasError = false;
                        nextElementSibling.classList.add("hidden")
                        e.target.classList.add("border-primary")
                        e.target.classList.remove("border-neutral")
                    }

                    //-------------------------------------------------------------------------------
                } else if (name === "registerRut_number") {
                    //Validando el Rut

                    if (value === "") {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        nextElementSibling.innerHTML = "El Rut no puede quedar vacio";
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                    } else if (!soloNumeros.test(value)) {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        nextElementSibling.innerHTML = "El Rut debe tener solo numeros";
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                        return hasError;
                    } else {
                        hasError = false;
                        nextElementSibling.classList.add("hidden")
                        e.target.classList.add("border-primary")
                        e.target.classList.remove("border-neutral")
                    }
                    //-------------------------------------------------------------------------------
                } else if (name === "registerFirst_name") {
                    //Validando el nombre

                    if (value === "") {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        nextElementSibling.innerHTML = "El Nombre no puede quedar vacio";
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                    } else if (!soloLetras.test(value)) {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                        nextElementSibling.innerHTML = "El Nombre debe tener solo letras";
                        return hasError;
                    } else {
                        hasError = false;
                        nextElementSibling.classList.add("hidden")
                        e.target.classList.add("border-primary")
                        e.target.classList.remove("border-neutral")
                    }
                    //-------------------------------------------------------------------------------
                } else if (name === "registerLast_name") {

                    //Validando el apellido

                    if (value === "") {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        nextElementSibling.innerHTML = "El Apellido no puede quedar vacio";
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                    } else if (!soloLetras.test(value)) {
                        hasError = true;
                        nextElementSibling.classList.remove("hidden");
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                        nextElementSibling.innerHTML = "El Apellido debe tener solo letras";
                        return hasError;
                    } else {
                        hasError = false;
                        nextElementSibling.classList.add("hidden")
                        e.target.classList.add("border-primary")
                        e.target.classList.remove("border-neutral")
                    }
                    //-------------------------------------------------------------------------------
                } else if (name === "registerPhone_number") {

                    if (value === "") {
                        return hasError = true;
                    }
                    //-------------------------------------------------------------------------------
                } else if (name === "registerPassword") {

                    if (value === "") {
                        return hasError = true;
                    }
                    //-------------------------------------------------------------------------------
                } else if (name === "registerRepeatPassword") {

                    if (value === "") {
                        return hasError = true;
                    }
                    //-------------------------------------------------------------------------------
                } else if (name === "registerTermsAndCoinditions") {

                    if (checked === false) {
                        return hasError = true;
                    }
                    //-------------------------------------------------------------------------------
                }

                console.log(hasError)
            },
            registerUser: async (e) => {

                const { registerEmail, registerRut_number, registerFirst_name, registerLast_name, registerPhone_number, registerPassword, registerRepeatPassword, registerTermsAndCoinditions } = getStore();

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