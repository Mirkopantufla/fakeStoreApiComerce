import Link from 'next/link'
import React from 'react'


export const metadata = {
    title: 'Admin Fake Store',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const liClass = 'outline outline-1 bg-neutral text-primary rounded-md hover:bg-primary hover:text-neutral font-bold cursor-pointer w-full h-10 p-0'
const linkClass = 'flex justify-center items-center w-full h-full m-0';

const productLayout = ({ children }) => {

    return (
        <>
            <ul className='flex bg-opacity-25 mb-4'>
                <li className={liClass}><Link className={linkClass} href={'/admin/products/search'}>Buscar</Link></li>
                <li className={liClass}><Link className={linkClass} href={'/admin/products/add'}>Agregar</Link></li>
            </ul>
            {children}
        </>
    )
}

export default productLayout