"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

//LOGIN PAGE
const LoginPage = () => {

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault()

        const username = e.target.username.value;
        const password = e.target.password.value;

        const options = {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const respJson = await fetch('https://fakestoreapi.com/auth/login', options)
        const data = await respJson.json();

        console.log(data)

        router.push('/products')
    }


    return (
        <div className='flex justify-center items-center min-h-[80vh]'>
            <form
                className='form-control border-2 rounded-lg border-neutral items-center p-10 gap-4 min-w-[30vw]'
                onSubmit={onSubmit}>
                <h1 className='text-4xl text-center'>Iniciar Sesión</h1>
                <div className='divider border-white before:bg-neutral after:bg-neutral' />
                <label placeholder='Your User' className='label'>Username</label>
                <input
                    className='input input-bordered w-full max-w-xs'
                    placeholder='pepito123'
                    type="text"
                    name="username"
                    id="username"
                />
                <label className='label'>Constraseña</label>
                <input
                    className='input input-bordered w-full max-w-xs'
                    placeholder='********'
                    type="password"
                    name="password"
                    id="password"
                />
                <label className='flex justify-between' htmlFor="">
                    No tienes cuenta?
                    <Link className='link link-accent ms-10' href={'/login/register'}>
                        Registrate!
                    </Link>
                </label>

                <button className='btn btn-primary'>Login</button>
            </form>
        </div>
    )
}

export default LoginPage