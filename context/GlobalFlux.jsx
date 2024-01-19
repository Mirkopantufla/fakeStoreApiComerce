'use client'

import { baseURL } from "@/utils/paths";
import { regexCorreos, regexRut, regexSecurePassword, regexSoloLetras, regexSoloNumeros } from "@/utils/regexStore";
import { toast, Flip } from "react-toastify";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: 'http://127.0.0.1:5000',
            cart: [],
            registerTermsAndConditions: false,
            isLoading: false,
            categories: []
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

                const { registerTermsAndConditions, registerPassword } = getStore();
                const { changeTermsAndConditions } = getActions();

                //Validando los campos para que no esten vacios y que cumplan cierta condicion, dependiendo del regex que le pasemos
                // -Los dejo separados, para tener un mejor manejo condicional 
                // -Reset password solo necesita ser igual a password
                // -Terminos y condiciones solo debe validar si es true.

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

                    if (e.target.value === "" || e.target.value === undefined) {
                        hasError = true;
                        e.target.nextElementSibling.classList.remove("hidden");
                        e.target.nextElementSibling.innerHTML = innerMessage1;
                        e.target.classList.remove("border-primary")
                        e.target.classList.add("border-neutral")
                        return hasError;
                    } else if (e.target.value === registerPassword) {
                        hasError = false;
                        e.target.nextElementSibling.classList.remove("hidden");
                        e.target.nextElementSibling.classList.add("hidden");
                        e.target.classList.remove("border-neutral")
                        e.target.classList.add("border-primary")
                        return hasError;
                    } else {
                        hasError = true;
                        e.target.nextElementSibling.classList.remove("hidden");
                        e.target.nextElementSibling.innerHTML = innerMessage2;
                        e.target.classList.remove("border-primary")
                        e.target.classList.add("border-neutral")
                        return hasError;
                    }

                } else {
                    let smallTerms = document.getElementById("smallRegisterTermsAndConditions");

                    if (registerTermsAndConditions === false) {
                        smallTerms.classList.remove("hidden")
                        smallTerms.classList.add("hidden")
                        hasError = true;
                        changeTermsAndConditions()
                        return hasError;
                    } else {
                        smallTerms.classList.remove("hidden")
                        hasError = false;
                        changeTermsAndConditions()
                        return hasError;
                    }

                }

            },

            validateFormData: (e) => {
                let hasError = false;
                const { validateData } = getActions();
                let { name } = e.target;

                if (name === "registerEmail") {
                    //Validando el Email, primero si esta vacio y despues con un formato de correo
                    validateData(e, "El email no puede quedar vacio", "El correo debe tener un formato valido", regexCorreos, hasError)
                } else if (name === "registerRut_number") {
                    //Validando el Rut, primero si esta vacio y despues con un formato correcto
                    validateData(e, "El Rut no puede quedar vacio", "El Rut debe ser valido", regexRut, hasError)
                } else if (name === "registerFirst_name") {
                    //Validando el nombre
                    validateData(e, "El Nombre no puede quedar vacio", "El Nombre debe tener solo letras", regexSoloLetras, hasError)
                } else if (name === "registerLast_name") {
                    //Validando el apellido
                    validateData(e, "El apellido no puede quedar vacio", "El apellido debe tener solo letras", regexSoloLetras, hasError)
                } else if (name === "registerPhone_number") {
                    //Validando el numero de telefono
                    validateData(e, "El numero de telefono no puede quedar vacio", "El telefono debe tener solo numeros.", regexSoloNumeros, hasError)
                } else if (name === "registerPassword") {
                    //Validando la contraseña
                    validateData(e, "Debe crear una contraseña.", "La contraseña debe tener el formato requerido.", regexSecurePassword, hasError)
                } else if (name === "registerRepeatPassword") {
                    //Validando igualdad de contraseñas
                    validateData(e, "Debes repetir tu contraseña.", "Las contraseñas deben ser iguales", undefined, hasError)
                } else if (name === "registerTermsAndConditions") {
                    //Validando de que se hayan aceptado los terminos
                    validateData(e, "Debes aceptar los terminos para continuar.", "", undefined, hasError)
                }

                return hasError;
            },
            registerUser: async (e) => {

                e.preventDefault()
                let { registerRut_number } = getStore();
                const { registerEmail, registerFirst_name, registerLast_name, registerPhone_number, registerPassword, registerRepeatPassword, registerTermsAndConditions } = getStore();

                //Se debe quitar el guion para mandar la informacion al back como number
                registerRut_number = registerRut_number?.slice(0, -2) + registerRut_number?.slice(-1)

                //Ordeno la informacion para ser enviada al backend
                const formData = {
                    email: registerEmail,
                    rut_number: parseInt(registerRut_number),
                    first_name: registerFirst_name,
                    last_name: registerLast_name,
                    phone_number: registerPhone_number,
                    password: registerPassword,
                    repeatPassword: registerRepeatPassword,
                    terms_conditions: registerTermsAndConditions
                }

                //Por cada iteración...
                for (const key in formData) {
                    let element = undefined;

                    //Pregunto si tiene algun dato asignado a la propiedad actual de la iteración
                    //Si es así, se guarda en la variable element
                    if (Object.hasOwnProperty.call(formData, key)) {
                        element = formData[key];
                    }

                    //Si algun elemento no existe, retorna una advertencia.
                    if (element === undefined || element === null || element === "" || element === false) {
                        return toast.error('Debes llenar el formulario antes de continuar.')
                    }
                }

                setStore({ isLoading: true })

                const fetchOptions = {
                    apiURL: `${baseURL}/api/users/register`,
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

                    if (data.status >= 200 && data.status < 300) {
                        toast.success("Registrado correctamente, ahora puedes iniciar sesión.", { autoClose: 2000 })
                    }

                } catch (error) {
                    toast.error(`Ha ocurrido un error... ${error}`, { autoClose: 2000 })
                } finally {
                    setStore({ isLoading: false })
                }

            },
            addToCart: (product) => {

                const { cart } = getStore();

                let productsOnCart = cart.filter((item) => item.id == product.id)

                if (productsOnCart.length == 0) {
                    //Seteo en el carrito el producto
                    setStore({ cart: cart.concat(product) })
                    toast.success(`${product.title} agregado al carrito`, { position: "top-right", autoClose: 1500, transition: Flip })
                } else {
                    // Si ya existe en favoritos, eliminar de la lista
                    getActions().deleteFromCart(product);
                }
                getActions().saveLocalStorageCartItem();

            },
            deleteFromCart: (product) => {

                const { cart } = getStore();

                setStore({ cart: cart.filter(item => item.id !== product.id) })

                toast.warning(`${product.title} quitado del carrito`, { position: "top-right", autoClose: 1500, transition: Flip })

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

                    const respJson = await fetch(`${baseURL}/products/find/categories`);
                    const data = await respJson.json();

                    // Las guardo en categories (store.categories)
                    setStore({ categories: [...data] });

                } catch (error) {
                    toast.error(`Ha ocurrido un error con getProductCategories: ${error}`, { autoClose: 2000 })
                }

            }
        }
    }
}
export default getState;