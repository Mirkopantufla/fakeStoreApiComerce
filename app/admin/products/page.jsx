import Link from 'next/link'
import React from 'react'

const AdminProducts = () => {
    return (

        <div className='flex justify-evenly bg-accent bg-opacity-25'>
            <Link className='bg-neutral text-primary p-2' href={'/admin/users'}>Buscar</Link>
            <Link className='bg-neutral text-primary p-2' href={'/admin/products'}>Agregar</Link>
            <Link className='bg-neutral text-primary p-2' href={'/admin/users'}>Modificar</Link>
        </div>

    )
}

export default AdminProducts