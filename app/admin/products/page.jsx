import Link from 'next/link'
import React from 'react'

const AdminProducts = () => {

    const liClass = 'outline outline-1 bg-neutral text-primary rounded-md hover:bg-primary hover:text-neutral font-bold cursor-pointer w-full h-[45vh] p-0 m-10'
    const linkClass = 'flex justify-center items-center text-5xl w-full h-full m-0';

    return (

        <ul className='flex bg-opacity-25 m-10'>
            <li className={liClass}><Link className={linkClass} href={'/admin/products/search'}>Search</Link></li>
            <li className={liClass}><Link className={linkClass} href={'/admin/products/add'}>Add</Link></li>
        </ul>

    )
}

export default AdminProducts