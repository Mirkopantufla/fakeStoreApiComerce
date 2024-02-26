'use client'
import { GlobalContext } from '@/context/GlobalContext'
import React, { useContext } from 'react'
import { BsCartPlusFill } from 'react-icons/bs'

const ClientAddToCart = ({ item }) => {

    const { actions } = useContext(GlobalContext);

    return (
        <button onClick={() => actions.addToCart(item)} type='button' className='btn btn-primary w-2/3'><BsCartPlusFill className='text-2xl' />Add to cart</button>
    )
}

export default ClientAddToCart