import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex justify-center items-center min-h-[70vh]'>
            <div className='form-control border-2 p-10 gap-4'>
                <h1 className='text-3xl text-center'>Login</h1>
                <label placeholder='Your User' className='label'>Usuario</label>
                <input className='input input-bordered w-full max-w-xs' type="text" />
                <label className='label'>Constraseña</label>
                <input className='input input-bordered w-full max-w-xs' type="text" name="" id="" />
                <Link className='link link-primary' href={'/register'}>
                    Registrate!
                </Link>
                <button className='btn btn-primary'>Login</button>
            </div>
        </div>
    )
}

export default page