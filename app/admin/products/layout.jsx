'use client'
import React from 'react'
import NavLink from '@/components/NavLink'


export const metadata = {
    title: 'Admin Fake Store',
    description: 'Fake store with nextJS, data from fakeStoreAPI',
}

const ProductLayout = ({ children }) => {

    const linkClass = 'flex justify-center items-center font-bold cursor-pointer outline outline-1 h-full';

    return (

        <div className='flex flex-col h-full'>
            <div className='h-16'>
                <ul className='flex justify-between bg-opacity-25 m-2 gap-2 h-12'>
                    <li className='w-1/3'><NavLink classes={linkClass} text={'List'} href={'/admin/products/list'}></NavLink></li>
                    <li className='w-1/3'><NavLink classes={linkClass} text={'Search'} href={'/admin/products/search'}></NavLink></li>
                    <li className='w-1/3'><NavLink classes={linkClass} text={'Add'} href={'/admin/products/add'}></NavLink></li>
                </ul>
            </div>

            {children}

        </div>

    )
}

export default ProductLayout