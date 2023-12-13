import Link from 'next/link'
import React from 'react'

const AdminUsers = () => {

    const linkClasses = 'outline outline-1 bg-neutral text-primary rounded-md hover:bg-primary hover:text-neutral p-3'

    return (
        <ul className='flex justify-evenly bg-opacity-25 mt-4'>
            <li><Link className={linkClasses} href={'/admin/users'}>Buscar</Link></li>
            <li><Link className={linkClasses} href={'/admin/products'}>Agregar</Link></li>
            <li><Link className={linkClasses} href={'/admin/users'}>Modificar</Link></li>
        </ul>
    )
}

export default AdminUsers