import Link from 'next/link';
import React from 'react'
import { FaArrowUp } from "react-icons/fa";

const adminPage = () => {

    return (
        <div className='min-h-[60vh] flex flex-col justify-evenly'>
            <div className='flex justify-around'>
                <FaArrowUp className='text-primary text-5xl bounceAnimation' />
                <FaArrowUp className='text-primary text-5xl bounceAnimation' />
            </div>
            <h2 className='text-center text-3xl py-3 bg-neutral'>Aqui puedes gestionar tus usuarios y productos</h2>
        </div>
    )
}

export default adminPage