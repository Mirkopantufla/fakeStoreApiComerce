import Link from 'next/link';
import React from 'react'
import { FaArrowUp } from "react-icons/fa";

const adminPage = () => {

    return (
        <div className='min-h-[70vh]'>
            <div className='flex justify-around mt-4'>
                <FaArrowUp className='text-primary text-5xl bounceAnimation' />
                <FaArrowUp className='text-primary text-5xl bounceAnimation' />
            </div>
            <h2 className='text-center text-2xl my-2 py-3 bg-neutral'>Aqui puedes gestionar tus usuarios y productos</h2>
        </div>
    )
}

export default adminPage