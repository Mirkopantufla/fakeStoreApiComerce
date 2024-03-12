'use client'
import { GlobalContext } from '@/context/GlobalContext'
import Link from 'next/link'
import React, { useContext } from 'react'

const AdminLink = () => {

    const { store } = useContext(GlobalContext)

    return (
        <>
            {
                store?.user?.role_id === 1 ?
                    <li><Link href={'/admin'}>Admin</Link></li>
                    :
                    null
            }

        </>
    )
}

export default AdminLink