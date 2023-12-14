'use client'
import { GlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';
import React, { useContext } from 'react'
import { MdDelete } from "react-icons/md";

const CartItemsIndicator = () => {

    const { store: { cart }, actions } = useContext(GlobalContext)

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        cart.map((item) => totalPrice += item.price)

        return totalPrice.toFixed(2);
    }


    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item">{cart.length}</span>
                </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-96 bg-base-100 shadow border-2 border-primary">
                <div className="card-body">
                    {
                        cart.map((item) => {
                            return (
                                <div className='flex items-center justify-between p-2 mb-2 border border-primary rounded-md hover:bg-primary hover:bg-opacity-10 active:scale-95'>
                                    <Link className='flex' href={`/products/${item.id}`}>
                                        <div>
                                            <img className='min-w-[65px] max-w-[65px] min-h-[80px] max-h-[80px] me-5' src={item.image} alt="" />
                                        </div>
                                        <div className='flex flex-col items-center justify-center'>
                                            <span className=' leading-8 line-clamp-1'>{item.title}</span>
                                            <div className='divider lg:divider-horizontal'></div>
                                            <span className='font-bold'>{`$${item.price}`}</span>
                                        </div>
                                    </Link>
                                    <div onClick={() => actions.deleteFromCart(item)} className='bg-primary border-2 text-black p-2 cursor-pointer hover:bg-error active:scale-95'><MdDelete className='text-3xl' /></div>
                                </div>
                            )
                        })
                    }
                    <span className="text-info">{`Subtotal: $${calculateTotalPrice()}`}</span>
                    <div className="card-actions">
                        <Link href={'/cart'} className="btn btn-primary btn-block">View cart</Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartItemsIndicator