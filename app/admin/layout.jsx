import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: 'Admin Fake Store',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const liClass = 'outline outline-1 bg-neutral text-primary hover:bg-primary hover:text-neutral font-bold cursor-pointer w-full h-[5vh] p-0'
const linkClass = 'flex justify-center items-center w-full h-full m-0';

const AdminLayout = ({ children }) => {

    return (
        <>
            <div className='h-[15vh] flex flex-col justify-between'>
                <h1 className='text-center text-4xl pt-5'>Admin Section</h1>
                <ul className='flex bg-opacity-25'>
                    <li className={`${liClass} `}><Link className={linkClass} href={'/admin/products'}>Products</Link></li>
                    <li className={liClass}><Link className={linkClass} href={'/admin/users'}>Users</Link></li>
                </ul>

            </div>
            {children}
        </>
    )
}

export default AdminLayout