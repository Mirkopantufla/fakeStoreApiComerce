'use client'
import { GlobalContext } from '@/context/GlobalContext'
import React, { useContext } from 'react'

const ClientAddToCart = ({ item }) => {

    const { actions } = useContext(GlobalContext);

    return (
        <button onClick={() => actions.addToCart(item)} type='button' className='btn btn-primary w-full'>Añadir al carrito</button>
    )
}

export default ClientAddToCart