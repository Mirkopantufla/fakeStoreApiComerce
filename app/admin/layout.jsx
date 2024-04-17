'use client'
import React from 'react'
import IsAdmin from '@/components/IsAdmin'
import NavLink from '@/components/NavLink'


export const metadata = {
    title: 'Admin Fake Store',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const linkClass = 'flex justify-center items-center font-bold cursor-pointer outline outline-1 h-16';

const AdminLayout = ({ children }) => {

    return (

        <div className='grid grid-cols-8 min-h-[76vh]'>
            <div className='col-span-1 p-2 border border-neutral border-y-0'>
                <ul className='bg-opacity-25'>
                    <li><NavLink classes={linkClass} href={'/admin/users'} text={'Users'} /></li>
                    <li><NavLink classes={linkClass} href={'/admin/products'} text={'Products'} /></li>
                    <li><NavLink classes={linkClass} href={'/admin/offers'} text={'Offers'} /></li>
                </ul>
            </div>
            <div className='col-span-7'>
                {children}
            </div>
        </div>

    )
}

export default IsAdmin(AdminLayout);