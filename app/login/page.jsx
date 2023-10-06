import Link from 'next/link'
import React from 'react'

//LOGIN PAGE
const page = () => {
    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form className='form-control border-2 rounded-lg border-neutral items-center p-10 gap-4 min-w-[30vw]'>
                <h1 className='text-4xl text-center'>Iniciar Sesión</h1>
                <label placeholder='Your User' className='label'>Correo</label>
                <input className='input input-bordered w-full max-w-xs' type="text" />
                <label className='label'>Constraseña</label>
                <input className='input input-bordered w-full max-w-xs' type="text" name="" id="" />
                <label className='flex justify-between' htmlFor="">
                    No tienes cuenta?
                    <Link className='link link-accent ms-10' href={'/login/register'}>
                        Registrate!
                    </Link>
                </label>

                <button type='button' className='btn btn-primary'>Login</button>
            </form>
        </div>
    )
}

export default page