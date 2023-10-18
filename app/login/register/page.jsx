import Link from 'next/link'
import React from 'react'
import ClientModalButton from './ClientModalButton'

//REGISTER PAGE
const page = () => {

    const inputClassName = 'input input-sm text-center input-bordered w-full'

    const validateForm = () => {

    }


    const handleSubmit = async () => {

        try {

            const respJson = await fetch()

        } catch (error) {

        }
    }


    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form className='form-control border-2 rounded-lg border-neutral items-center my-10 p-10 min-w-[35vw]' onSubmit={handleSubmit()}>
                <div className='flex flex-col w-[70%] gap-7'>
                    <h1 className='text-4xl text-center font-bold'>Registrate</h1>

                    <div className='divider border-white before:bg-neutral after:bg-neutral' />

                    {/* <------------------------- CORREO ---------------------------> */}
                    <div>
                        <label className='font-bold text-lg'>Correo</label>
                        <input
                            placeholder='correo@correo.cl'
                            className={inputClassName}
                            type="email"
                            name="email"
                            id="email"
                        />
                    </div>
                    {/* <------------------------- RUT ---------------------------> */}
                    <div>
                        <label className='font-bold text-lg'>Rut</label>
                        <input
                            placeholder='141234567'
                            className={inputClassName}
                            type="text"
                            name="rut_number"
                            id="rut_number"
                        />
                        <small className='text-secondary'>(Sin puntos ni guion)</small>
                    </div>
                    {/* <------------------------- NOMBRE ---------------------------> */}
                    <div>
                        <label className='font-bold text-lg'>Nombre</label>
                        <input
                            placeholder='Federico'
                            className={inputClassName}
                            type="text"
                            name="first_name"
                            id="first_name"
                        />
                    </div>
                    {/* <------------------------- APELLIDO ---------------------------> */}
                    <div>
                        <label className='font-bold text-lg'>Apellido</label>
                        <input
                            placeholder='Lorca'
                            className={inputClassName}
                            type="text"
                            name="last_name"
                            id="last_name"
                        />
                    </div>
                    {/* <------------------------- TELEFONO ---------------------------> */}
                    <div>
                        <label className='font-bold text-lg'>Numero de Telefono</label>
                        <input
                            placeholder='569 4055 0785'
                            className={inputClassName}
                            type="text"
                            name="phone_number"
                            id="phone_number"
                        />
                        <small className='text-secondary'>(Solo numeros)</small>
                    </div>
                    {/* <------------------------- CONTRASEÑA ---------------------------> */}
                    <div>
                        <label className='font-bold text-lg'>Constraseña</label>
                        <input
                            placeholder='************'
                            className={inputClassName}
                            type="password"
                            name="password"
                            id="password"
                        />
                    </div>
                    {/* <------------------------- CONTRASEÑA2 ---------------------------> */}
                    <div>
                        <label className='font-bold text-lg'>Repite Contraseña</label>
                        <input
                            placeholder='************'
                            className={inputClassName}
                            type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                        />
                    </div>
                    {/* <------------------------- TERMINOS Y CONDICIONES ---------------------------> */}
                    <div className='mb-1 flex flex-col items-center'>
                        <div className='flex'>
                            <input
                                className='me-4 checkbox checkbox-primary'
                                type="checkbox"
                            />
                            <ClientModalButton />
                        </div>
                        <small className='text-secondary'>(Debes aceptar los terminos para registrate)</small>
                    </div>

                    {/* <------------------------- BOTON REGISTRAR ---------------------------> */}
                    <button type='button' className='btn btn-primary mt-4'>Registrarme!</button>
                </div>
            </form>

            {/* Dialogo de modal */}
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