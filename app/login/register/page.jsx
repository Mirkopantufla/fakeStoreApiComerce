"use client"
import React, { useState } from 'react'
import ClientModalButton from './_components/ClientModalButton'
import VerifyPasswordSmalls from './_components/VerifyPasswordSmalls'
import { regexCorreos, regexRut, regexSecurePassword, regexSoloLetras, regexSoloNumeros } from '@/utils/regexStore'
import { baseURL } from '@/utils/paths'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

//REGISTER PAGE
const registerPage = () => {

    const inputClassName = 'input input-sm text-center input-bordered w-full'
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerRutNumber, setRegisterRutNumber] = useState('');
    const [registerFirstName, setRegisterFirstName] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState('');
    const [registerTermsAndConditions, setRegisterTermsAndConditions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const validateData = (e, innerMessage1, innerMessage2, regex, hasError) => {

        //Validando los campos para que no esten vacios y que cumplan cierta condicion, dependiendo del regex que le pasemos
        // -Los dejo separados, para tener un mejor manejo condicional 
        // -Reset password solo necesita ser igual a password
        // -Terminos y condiciones solo debe validar si es true.

        if (e.target.name === 'registerEmail' ||
            e.target.name === 'registerRutNumber' ||
            e.target.name === 'registerFirstName' ||
            e.target.name === 'registerLastName' ||
            e.target.name === 'registerPhoneNumber' ||
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
                // setRegisterTermsAndConditions(!registerTermsAndConditions)
                return hasError;
            } else {
                smallTerms.classList.remove("hidden")
                hasError = false;
                // setRegisterTermsAndConditions(!registerTermsAndConditions)
                return hasError;
            }

        }

    }

    const validateFormData = (e) => {
        let hasError = false;
        let { name } = e.target;

        if (name === "registerEmail") {
            //Validando el Email, primero si esta vacio y despues con un formato de correo
            validateData(e, "El email no puede quedar vacio", "El correo debe tener un formato valido", regexCorreos, hasError)
        } else if (name === "registerRutNumber") {
            //Validando el Rut, primero si esta vacio y despues con un formato correcto
            validateData(e, "El Rut no puede quedar vacio", "El Rut debe ser valido", regexRut, hasError)
        } else if (name === "registerFirstName") {
            //Validando el nombre
            validateData(e, "El Nombre no puede quedar vacio", "El Nombre debe tener solo letras", regexSoloLetras, hasError)
        } else if (name === "registerLastName") {
            //Validando el apellido
            validateData(e, "El apellido no puede quedar vacio", "El apellido debe tener solo letras", regexSoloLetras, hasError)
        } else if (name === "registerPhoneNumber") {
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
    }

    const registerUser = async (e) => {

        e.preventDefault()

        //Se debe quitar el guion para mandar la informacion al back como number
        let formatedRut = registerRutNumber?.slice(0, -2) + registerRutNumber?.slice(-1)

        //Ordeno la informacion para ser enviada al backend
        const formData = {
            email: registerEmail,
            rut_number: parseInt(formatedRut),
            first_name: registerFirstName,
            last_name: registerLastName,
            phone_number: registerPhoneNumber,
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

        setIsLoading(true)

        const fetchOptions = {
            apiURL: `${baseURL}/users/register`,
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

            if (data.status === 400) {
                toast.warning(data.warning)
            } else if (data.status === 200) {
                toast.success("Registrado correctamente, ahora puedes iniciar sesión.", { autoClose: 2000 })
                router.push('/login')
            }

        } catch (error) {
            toast.error(`Ha ocurrido un error... ${error}`, { autoClose: 2000 })
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form
                className='form-control border-2 rounded-lg border-neutral items-center my-10 p-10 min-w-[35vw]'
                onSubmit={e => registerUser(e)}
            >
                <div className='flex flex-col w-[70%] gap-7'>
                    <h1 className='text-4xl text-center font-bold'>Registrate</h1>

                    <div className='divider border-white before:bg-neutral after:bg-neutral' />

                    {/* <------------------------- CORREO ---------------------------> */}
                    <div id="registerEmail">
                        <label className='font-bold text-lg'>Correo</label>
                        <input
                            placeholder='correo@correo.cl'
                            className={inputClassName}
                            type="text"
                            name="registerEmail"
                            onChange={(e) => { setRegisterEmail(e.target.value), validateFormData(e) }}
                            onBlur={(e) => validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                    </div>
                    {/* <------------------------- RUT ---------------------------> */}
                    <div className='flex flex-col' id="registerRutNumber">
                        <label className='font-bold text-lg'>Rut</label>
                        <input
                            placeholder='12345678-9'
                            className={inputClassName}
                            type="text"
                            name="registerRutNumber"
                            onChange={(e) => { setRegisterRutNumber(e.target.value), validateFormData(e) }}
                            onBlur={(e) => validateFormData(e)}
                        />
                        <small className='hidden mt-1 text-red-500'></small>
                        <small className='text-secondary mt-1'>(SIN puntos y CON guion. "xxxxxxxx-x" )</small>
                    </div>
                    {/* <------------------------- NOMBRE ---------------------------> */}
                    <div id="registerFirstName">
                        <label className='font-bold text-lg'>Nombre</label>
                        <input
                            placeholder='Federico'
                            className={inputClassName}
                            type="text"
                            name="registerFirstName"
                            onChange={(e) => { setRegisterFirstName(e.target.value), validateFormData(e) }}
                            onBlur={(e) => validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                    </div>
                    {/* <------------------------- APELLIDO ---------------------------> */}
                    <div id="registerLastName">
                        <label className='font-bold text-lg'>Apellido</label>
                        <input
                            placeholder="Lorca"
                            className={inputClassName}
                            type="text"
                            name="registerLastName"
                            onChange={(e) => { setRegisterLastName(e.target.value), validateFormData(e) }}
                            onBlur={(e) => validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                    </div>
                    {/* <------------------------- PHONE_NUMBER ---------------------------> */}
                    <div className='flex flex-col' id="registerPhoneNumber">
                        <label className='font-bold text-lg'>Numero de Telefono</label>
                        <input
                            placeholder='569 4055 0785'
                            className={inputClassName}
                            type="text"
                            name="registerPhoneNumber"
                            onChange={(e) => { setRegisterPhoneNumber(e.target.value), validateFormData(e) }}
                            onBlur={(e) => validateFormData(e)}
                        />
                        <small className='hidden mt-1 text-red-500'></small>
                        <small className='text-secondary'>(Solo numeros)</small>
                    </div>
                    {/* <------------------------- PASSWORD ---------------------------> */}
                    <div className='flex flex-col' id="registerPassword">
                        <label className='font-bold text-lg'>Constraseña</label>
                        <input
                            placeholder='************'
                            className={`${inputClassName} relative`}
                            type="password"
                            name="registerPassword"
                            onChange={(e) => { validateFormData(e), setRegisterPassword(e.target.value) }}
                            onBlur={(e) => validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                        <VerifyPasswordSmalls registerPassword={registerPassword} />
                    </div>
                    {/* <------------------------- PASSWORD 2 ---------------------------> */}
                    <div id="registerRepeatPassword">
                        <label className='font-bold text-lg'>Repite Contraseña</label>
                        <input
                            placeholder='************'
                            className={inputClassName}
                            type="password"
                            name="registerRepeatPassword"
                            onChange={(e) => { setRegisterRepeatPassword(e.target.value), validateFormData(e) }}
                            onBlur={(e) => validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                    </div>
                    {/* <------------------------- TERMS & CONDITIONS ---------------------------> */}
                    <div className='flex flex-col items-center' id="registerTermsAndConditions">
                        <div>
                            <input
                                className='me-4 checkbox checkbox-primary'
                                type="checkbox"
                                name="registerTermsAndConditions"
                                value={false}
                                onClick={() => setRegisterTermsAndConditions(!registerTermsAndConditions)}
                                onChange={(e) => validateFormData(e)}
                            />
                            <ClientModalButton />
                        </div>
                        <small id="smallRegisterTermsAndConditions" className='hidden text-red-500'>Es obligatorio aceptar los terminos para continuar.</small>
                        <small className='text-secondary'>(Debes aceptar los terminos para registrate)</small>
                    </div>

                </div>
                {/* <------------------------- REGISTER BUTTON ---------------------------> */}
                <button type='submit' disabled={isLoading} className='btn btn-primary mt-4 disabled:opacity-75'>
                    {isLoading ?
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        :
                        'Registrate!'}
                </button>

            </form>

            {/* -------------------------------------- MODAL DIALOG (TERMINOS Y CONDICIONES) -------------------------------------- */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Terminos y Condiciones</h3>
                    <p className="p-5 overflow-y-scroll max-h-[60vh]">
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec a aliquet urna. Fusce venenatis tellus sit amet justo finibus, ac pulvinar orci venenatis. Maecenas vel mi massa. In semper eleifend leo in tempus. Morbi porta pellentesque lacus quis elementum. Nullam tincidunt vitae nulla sed porta. Pellentesque dignissim ornare euismod. Donec fringilla tortor dui, posuere luctus turpis vulputate quis. Morbi quis enim vestibulum, scelerisque turpis at, pretium libero. Ut vehicula viverra sem. Pellentesque interdum enim vel dapibus cursus. Curabitur porta bibendum est, sed volutpat metus tempus accumsan. Nullam hendrerit fermentum ipsum, eu laoreet justo ultrices eu.

                        Nunc suscipit mauris et tellus imperdiet, non dignissim ligula iaculis. Morbi a leo dui. Sed sit amet augue sapien. In maximus sapien nec pharetra sagittis. Maecenas non dui leo. Aliquam erat volutpat. Duis quis turpis interdum, venenatis felis eu, consequat orci. In fringilla id ligula ut vulputate. Mauris ac pulvinar nisi, vel luctus nisl.

                        Vestibulum in enim lobortis, elementum nunc ac, pharetra quam. Duis quis turpis eget orci aliquam iaculis. Fusce blandit feugiat iaculis. Nunc odio est, hendrerit tempor dignissim quis, commodo id tellus. Phasellus facilisis sagittis est, ac fringilla libero cursus at. Vestibulum tincidunt dapibus nunc, a porta leo ullamcorper eget. Duis sapien arcu, fringilla at libero non, vestibulum ultricies eros. Vivamus at dictum ex. Nunc molestie pretium magna, vitae vestibulum lectus molestie a. Maecenas luctus vel leo sit amet venenatis. Nullam finibus erat in enim facilisis luctus. Fusce rutrum gravida pharetra.
                    </p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default registerPage