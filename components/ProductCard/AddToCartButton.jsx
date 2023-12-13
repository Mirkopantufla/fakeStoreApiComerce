'use client'
import { GlobalContext } from '@/context/GlobalContext';
import React, { useContext } from 'react'
import { BsCartPlusFill } from 'react-icons/bs'

const AddToCartButton = ({ product }) => {

    const { store, actions } = useContext(GlobalContext);

    return (
        <button onClick={() => actions.addToCart(product)} className='btn btn-primary justify-self-end'><BsCartPlusFill className='text-2xl' /></button>
    )
}

export default AddToCartButton