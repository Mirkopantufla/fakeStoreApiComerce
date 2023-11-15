"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'

const ClientBackButton = () => {

    const router = useRouter();

    return (
        <button className='btn btn-primary m-4' onClick={() => router.back()}>
            <IoArrowBackSharp className='text-3xl' />
        </button>
    )
}

export default ClientBackButton