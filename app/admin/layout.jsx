import Link from 'next/link'
import React from 'react'


export const metadata = {
    title: 'Fake Store NextJS',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const AdminLayout = ({ children }) => {

    return (
        <div>
            <h1 className='text-center text-4xl'>Seccion de Administración</h1>
            <div className='flex justify-evenly bg-accent bg-opacity-25 py-1'>
                <Link className='bg-neutral text-primary p-4' href={'/admin/products'}>Products</Link>
                <Link className='bg-neutral text-primary p-4' href={'/admin/users'}>Users</Link>
            </div>
            {children}
        </div>
    )
}

export default AdminLayout