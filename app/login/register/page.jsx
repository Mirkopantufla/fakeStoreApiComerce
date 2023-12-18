"use client"
import React, { useContext, useState } from 'react'
import ClientModalButton from '@/components/Login/Register/ClientModalButton'
import { GlobalContext } from '@/context/GlobalContext'
import VerifyPasswordSmalls from '@/components/Login/Register/VerifyPasswordSmalls'

//REGISTER PAGE
const page = () => {

    const inputClassName = 'input input-sm text-center input-bordered w-full'
    const { store, actions } = useContext(GlobalContext)
    const [conditions, setConditions] = useState(false);

    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form
                className='form-control border-2 rounded-lg border-neutral items-center my-10 p-10 min-w-[35vw]'
                onSubmit={e => actions.registerUser(e)}
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
                            onChange={(e) => actions.handleFormChange(e)}
                            onBlur={(e) => actions.validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                    </div>
                    {/* <------------------------- RUT ---------------------------> */}
                    <div className='flex flex-col' id="registerRut_number">
                        <label className='font-bold text-lg'>Rut</label>
                        <input
                            placeholder='12345678-9'
                            className={inputClassName}
                            type="text"
                            name="registerRut_number"
                            onChange={(e) => actions.handleFormChange(e)}
                            onBlur={(e) => actions.validateFormData(e)}
                        />
                        <small className='hidden mt-1 text-red-500'></small>
                        <small className='text-secondary mt-1'>(SIN puntos y CON guion. "xxxxxxxx-x" )</small>
                    </div>
                    {/* <------------------------- NOMBRE ---------------------------> */}
                    <div id="registerFirst_name">
                        <label className='font-bold text-lg'>Nombre</label>
                        <input
                            placeholder='Federico'
                            className={inputClassName}
                            type="text"
                            name="registerFirst_name"
                            onChange={(e) => actions.handleFormChange(e)}
                            onBlur={(e) => actions.validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                    </div>
                    {/* <------------------------- APELLIDO ---------------------------> */}
                    <div id="registerLast_name">
                        <label className='font-bold text-lg'>Apellido</label>
                        <input
                            placeholder="Lorca"
                            className={inputClassName}
                            type="text"
                            name="registerLast_name"
                            onChange={(e) => actions.handleFormChange(e)}
                            onBlur={(e) => actions.validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                    </div>
                    {/* <------------------------- PHONE_NUMBER ---------------------------> */}
                    <div className='flex flex-col' id="registerPhone_number">
                        <label className='font-bold text-lg'>Numero de Telefono</label>
                        <input
                            placeholder='569 4055 0785'
                            className={inputClassName}
                            type="text"
                            name="registerPhone_number"
                            onChange={(e) => actions.handleFormChange(e)}
                            onBlur={(e) => actions.validateFormData(e)}
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
                            onChange={(e) => actions.handleFormChange(e)}
                            onBlur={(e) => actions.validateFormData(e)}
                        />
                        <small className='hidden text-red-500'></small>
                        <VerifyPasswordSmalls />
                    </div>
                    {/* <------------------------- PASSWORD 2 ---------------------------> */}
                    <div id="registerRepeatPassword">
                        <label className='font-bold text-lg'>Repite Contraseña</label>
                        <input
                            placeholder='************'
                            className={inputClassName}
                            type="password"
                            name="registerRepeatPassword"
                            onChange={(e) => actions.handleFormChange(e)}
                            onBlur={(e) => actions.validateFormData(e)}
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
                                onClick={() => setConditions(!conditions)}
                                onChange={(e) => actions.validateFormData(e)}
                            />
                            <ClientModalButton />
                        </div>
                        <small id="smallRegisterTermsAndConditions" className='hidden text-red-500'>Es obligatorio aceptar los terminos para continuar.</small>
                        <small className='text-secondary'>(Debes aceptar los terminos para registrate)</small>
                    </div>

                </div>
                {/* <------------------------- REGISTER BUTTON ---------------------------> */}
                <button disabled={store.isLoading} className='btn btn-primary mt-4 disabled:opacity-75'>
                    {store?.isLoading ?
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

export default page