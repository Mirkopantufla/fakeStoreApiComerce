'use client'
import Link from 'next/link'
import React from 'react'
import IsAdmin from '@/components/IsAdmin'

export const metadata = {
    title: 'Admin Fake Store',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const liClass = 'outline outline-1 bg-neutral text-primary hover:bg-primary hover:text-neutral font-bold cursor-pointer w-full h-[10vh] p-0'
const linkClass = 'flex justify-center items-center w-full h-full m-0';

const AdminLayout = ({ children }) => {

    return (
        <>
            <div className='h-[15vh] flex flex-col justify-between'>
                <h1 className='text-center text-4xl pt-5'>Admin Section</h1>
                <ul className='flex bg-opacity-25'>
                    <li className={`${liClass} `}><Link className={linkClass} href={'/admin/products'}>Products</Link></li>
                    <li className={`${liClass} `}><Link className={linkClass} href={'/admin/offers'}>Offers</Link></li>
                    <li className={liClass}><Link className={linkClass} href={'/admin/users'}>Users</Link></li>
                </ul>

            </div>
            {children}
        </>
    )
}

export default IsAdmin(AdminLayout);