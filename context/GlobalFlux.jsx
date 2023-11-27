'use client'

import { regexCorreos, regexRut, regexSecurePassword, regexSoloLetras, regexSoloNumeros } from "@/utils/regexStore";
import { toast } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            cart: [],
            registerTermsAndConditions: false
        },
        actions: {
            handleFormChange: (e) => {
                let { name, value } = e.target;
                const { validateFormData } = getActions();

                setStore({ [name]: value })

                validateFormData(e);
            },
            changeTermsAndConditions: () => {

                const { registerTermsAndConditions } = getStore()

                setStore({ registerTermsAndConditions: !registerTermsAndConditions })
            },

            validateData: (e, innerMessage1, innerMessage2, regex, hasError) => {

                const { registerTermsAndConditions, registerRepeatPassword, registerPassword } = getStore();
                const { changeTermsAndConditions } = getActions();

                //Validando el Email, Primero si esta vacio y despues con un formato de correo


                if (e.target.name === 'registerEmail' ||
                    e.target.name === 'registerRut_number' ||
                    e.target.name === 'registerFirst_name' ||
                    e.target.name === 'registerLast_name' ||
                    e.target.name === 'registerPhone_number' ||
                    e.target.name === 'registerPassword') {

                    if (e.target.value === "" || e.target.value === undefined) {
                        hasError = true;
                        e.target.nextElementSibling.classList.remove("hidden");
                        e.target.nextElementSibling.innerHTML = innerMessage1;
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                        return hasError;

                    } else if (!regex.test(e.target.value)) {
                        hasError = true;
                        e.target.nextElementSibling.classList.remove("hidden");
                        e.target.nextElementSibling.innerHTML = innerMessage2;
                        e.target.classList.add("border-neutral")
                        e.target.classList.remove("border-primary")
                        return hasError;
                    } else {
                        hasError = false;
                        e.target.nextElementSibling.classList.add("hidden")
                        e.target.classList.add("border-primary")
                        e.target.classList.remove("border-neutral")
                        return hasError;
                    }

                } else if (e.target.name === 'registerRepeatPassword') {

                    if (e.target.value === registerPassword) {
                        hasError = false;
                        e.target.nextElementSibling.classList.remove("hidden");
                        e.target.nextElementSibling.classList.add("hidden");
                        e.target.nextElementSibling.innerHTML = innerMessage1;
                        e.target.classList.remove("border-neutral")
                        e.target.classList.add("border-primary")
                        return hasError;
                    } else {
                        hasError = true;
                        e.target.nextElementSibling.classList.remove("hidden");
                        e.target.nextElementSibling.innerHTML = innerMessage1;
                        e.target.classList.remove("border-primary")
                        e.target.classList.add("border-neutral")
                        return hasError;
                    }

                } else {
                    let terms = document.getElementById("smallRegisterTermsAndConditions");

                    if (registerTermsAndConditions === false) {
                        terms.classList.remove("hidden")
                        terms.classList.add("hidden")
                        hasError = true;
                        changeTermsAndConditions()
                        return hasError;
                    } else {
                        terms.classList.remove("hidden")
                        hasError = false;
                        changeTermsAndConditions()
                        return hasError;
                    }

                }

            },

            validateFormData: (e) => {
                let hasError = false;
                const { validateData } = getActions();
                const { registerRepeatPassword } = getStore();
                let { name, value } = e.target;


                //-------------------------------------------------------------------------------
                if (name === "registerEmail") {

                    //Validando el Email, Primero si esta vacio y despues con un formato de correo
                    validateData(e, "El email no puede quedar vacio", "El correo debe tener un formato valido", regexCorreos, hasError)

                    //-------------------------------------------------------------------------------
                } else if (name === "registerRut_number") {

                    //Validando el Rut
                    validateData(e, "El Rut no puede quedar vacio", "El Rut debe ser valido", regexRut, hasError)

                } else if (name === "registerFirst_name") {

                    //Validando el nombre
                    validateData(e, "El Nombre no puede quedar vacio", "El Nombre debe tener solo letras", regexSoloLetras, hasError)

                    //-------------------------------------------------------------------------------
                } else if (name === "registerLast_name") {

                    //Validando el apellido
                    validateData(e, "El apellido no puede quedar vacio", "El apellido debe tener solo letras", regexSoloLetras, hasError)

                    //-------------------------------------------------------------------------------
                } else if (name === "registerPhone_number") {
                    //Validando el numero de telefono

                    validateData(e, "El numero de telefono no puede quedar vacio", "El telefono debe tener solo numeros.", regexSoloNumeros, hasError)

                    //-------------------------------------------------------------------------------
                } else if (name === "registerPassword") {

                    validateData(e, "Debe crear una contraseña.", "La contraseña debe tener el formato requerido.", regexSecurePassword, hasError)

                    //-------------------------------------------------------------------------------
                } else if (name === "registerRepeatPassword") {

                    validateData(e, "Las contraseñas deben ser iguales", "", undefined, hasError)

                    //-------------------------------------------------------------------------------
                } else if (name === "registerTermsAndConditions") {

                    validateData(e, "Debes aceptar los terminos para continuar.", "", undefined, hasError)
                    //-------------------------------------------------------------------------------
                }

                return hasError;
            },
            registerUser: async (e) => {

                e.preventDefault()

                const { registerEmail, registerRut_number, registerFirst_name, registerLast_name, registerPhone_number, registerPassword, registerRepeatPassword, registerTermsAndConditions } = getStore();


                const formData = {
                    email: registerEmail,
                    rut_number: registerRut_number,
                    first_name: registerFirst_name,
                    last_name: registerLast_name,
                    phone_number: registerPhone_number,
                    password: registerPassword,
                    repeatPassword: registerRepeatPassword,
                    terms_conditions: registerTermsAndConditions
                }

                for (const key in formData) {
                    let element = undefined;
                    if (Object.hasOwnProperty.call(formData, key)) {
                        element = formData[key];
                    }

                    if (element === undefined || element === null || element === "" || element === false) {
                        return toast.error('Debes llenar el formulario antes de continuar.')
                    }
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