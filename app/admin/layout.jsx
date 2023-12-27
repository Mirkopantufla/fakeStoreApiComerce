import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: 'Admin Fake Store',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const liClass = 'outline outline-1 bg-neutral text-primary rounded-md hover:bg-primary hover:text-neutral font-bold cursor-pointer w-full h-10 p-0'
const linkClass = 'flex justify-center items-center w-full h-full m-0';

const AdminLayout = ({ children }) => {

    return (
        <div className='pt-4'>
            <h1 className='text-center text-4xl'>Seccion de Administración</h1>
            <ul className='flex bg-opacity-25 mt-4'>
                <li className={`${liClass} `}><Link className={linkClass} href={'/admin/products'}>Products</Link></li>
                <li className={liClass}><Link className={linkClass} href={'/admin/users'}>Users</Link></li>
            </ul>
            {children}
        </div>
    )
}

export default AdminLayout