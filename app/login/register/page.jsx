import Link from 'next/link'
import React from 'react'
import ClientModalButton from './ClientModalButton'

//REGISTER PAGE
const page = () => {
    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form className='form-control border-2 rounded-lg border-neutral items-center p-10 gap-4 min-w-[30vw]'>
                <h1 className='text-3xl text-center'>Registrate</h1>
                <div className='divider border-white before:bg-neutral after:bg-neutral' />
                <label placeholder='Your User' className='label'>Correo</label>
                <input className='input input-bordered w-full max-w-xs' type="text" />
                <label className='label'>Constraseña</label>
                <input className='input input-bordered w-full max-w-xs' type="text" name="" id="" />
                <label className='label'>Repite Contraseña</label>
                <input className='input input-bordered w-full max-w-xs' type="text" name="" id="" />
                <span>
                    <input className='me-4' type="checkbox" />
                    <ClientModalButton />
                </span>

                {/* Dialogo de modal */}
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Terminos y Condiciones</h3>
                        <p className="py-4 overflow-y-scroll max-h-[60vh]">
                            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec a aliquet urna. Fusce venenatis tellus sit amet justo finibus, ac pulvinar orci venenatis. Maecenas vel mi massa. In semper eleifend leo in tempus. Morbi porta pellentesque lacus quis elementum. Nullam tincidunt vitae nulla sed porta. Pellentesque dignissim ornare euismod. Donec fringilla tortor dui, posuere luctus turpis vulputate quis. Morbi quis enim vestibulum, scelerisque turpis at, pretium libero. Ut vehicula viverra sem. Pellentesque interdum enim vel dapibus cursus. Curabitur porta bibendum est, sed volutpat metus tempus accumsan. Nullam hendrerit fermentum ipsum, eu laoreet justo ultrices eu.

                            Nunc suscipit mauris et tellus imperdiet, non dignissim ligula iaculis. Morbi a leo dui. Sed sit amet augue sapien. In maximus sapien nec pharetra sagittis. Maecenas non dui leo. Aliquam erat volutpat. Duis quis turpis interdum, venenatis felis eu, consequat orci. In fringilla id ligula ut vulputate. Mauris ac pulvinar nisi, vel luctus nisl.

                            Vestibulum in enim lobortis, elementum nunc ac, pharetra quam. Duis quis turpis eget orci aliquam iaculis. Fusce blandit feugiat iaculis. Nunc odio est, hendrerit tempor dignissim quis, commodo id tellus. Phasellus facilisis sagittis est, ac fringilla libero cursus at. Vestibulum tincidunt dapibus nunc, a porta leo ullamcorper eget. Duis sapien arcu, fringilla at libero non, vestibulum ultricies eros. Vivamus at dictum ex. Nunc molestie pretium magna, vitae vestibulum lectus molestie a. Maecenas luctus vel leo sit amet venenatis. Nullam finibus erat in enim facilisis luctus. Fusce rutrum gravida pharetra.
                        </p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
                <button type='button' className='btn btn-primary'>Registrarme!</button>
            </form>
        </div>
    )
}

export default page