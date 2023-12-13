import Link from 'next/link'
import React from 'react'


export const metadata = {
    title: 'Fake Store NextJS',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const linkClasses = 'outline outline-1 bg-neutral text-primary rounded-md hover:bg-primary hover:text-neutral p-3'

const AdminLayout = ({ children }) => {

    return (
        <div className='py-4'>
            <h1 className='text-center text-4xl'>Seccion de Administración</h1>
            <div className='flex justify-evenly bg-neutral py-2'>
                <Link className={linkClasses} href={'/admin/products'}>Products</Link>
                <Link className={linkClasses} href={'/admin/users'}>Users</Link>
            </div>
            {children}
        </div>
    )
}

export default AdminLayout