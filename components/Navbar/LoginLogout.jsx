'use client'
import { GlobalContext } from '@/context/GlobalContext'
import { logout } from '@/utils/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const LoginLogout = () => {

    const { store, actions } = useContext(GlobalContext)
    const router = useRouter();

    const logOutFunction = () => {

        logout()
        actions.deleteUserData()
        router.push('/products')

    }

    return (
        <>
            {
                store.access_token ?
                    <li><button onClick={() => logOutFunction()}>Logout</button></li>
                    :
                    <li><Link href={'/login'} >Log In</Link></li>
            }
        </>

    )
}

export default LoginLogout