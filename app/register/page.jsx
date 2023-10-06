import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form className='form-control flex items-center border-2 p-10 gap-4 min-w-[30vw]'>
                <h1 className='text-3xl text-center'>Register</h1>
                <hr className='divider' />
                <label placeholder='Your User' className='label'>Usuario</label>
                <input className='input input-bordered w-full max-w-xs' type="text" />
                <label className='label'>Constraseña</label>
                <input className='input input-bordered w-full max-w-xs' type="text" name="" id="" />
                <label className='label'>Repite Contraseña</label>
                <input className='input input-bordered w-full max-w-xs' type="text" name="" id="" />
            </form>
        </div>
    )
}

export default page