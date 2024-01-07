import Link from 'next/link'
import React from 'react'


export const metadata = {
    title: 'Fake Store',
    description: 'Fake store search page',
}

const liClass = 'outline outline-1 bg-neutral text-primary rounded-md hover:bg-primary hover:text-neutral font-bold cursor-pointer w-full h-[5vh] p-0'
const linkClass = 'flex justify-center items-center w-full h-full m-0';

const productLayout = ({ children }) => {

    return (
        <>
            <ul className='flex bg-opacity-25'>
                <li className={liClass}><Link className={linkClass} href={'/admin/products/search'}>Search</Link></li>
                <li className={liClass}><Link className={linkClass} href={'/admin/products/add'}>Add</Link></li>
            </ul>
            {children}
        </>
    )
}

export default productLayout