import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <section className='min-h-screen flex flex-col align-center justify-center'>
            <h1 className='text-7xl text-center'>404</h1>
            <h1 className='text-4xl text-center'>Not Found</h1>
            <Link className='text-2xl text-center font-extrabold mt-6 underline hover:text-slate-400' href={'/'}>
                Volver al inicio
            </Link>
        </section>
    )
}

export default NotFound