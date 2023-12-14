'use client'
import { GlobalContext } from '@/context/GlobalContext'
import React, { useContext } from 'react'

const Cart = () => {

    const { store: { cart } } = useContext(GlobalContext)

    return (
        <article className='grid grid-cols-12 grid-rows-4 min-h-[80vh]'>
            <section className='col-start-2 col-span-6 row-span-2 p-4'>
                <div className='flex items-center bg-neutral bg-opacity-50 border border-primary p-2'>
                    <input id='chkSelectAll' className='checkbox checkbox-primary checkbox-md mx-3' type='checkbox' />
                    <label className='text-2xl' htmlFor="chkSelectAll">{`Todos los articulos (${cart.length})`}</label>
                </div>
                {
                    cart.map((item) => {
                        return (
                            <div className='max-h-[90%] flex items-center border border-primary p-3 my-2'>
                                <input className='checkbox checkbox-md checkbox-primary mx-3' type="checkbox" />
                                <img className='min-w-[80px] max-w-[80px] min-h-[95px] max-h-[95px]' src={item.image} alt="" />
                                <div className='flex flex-col items-center justify-between m-auto'>
                                    <span className='text-center mx-5'>{item.title}</span>
                                    <span className='badge badge-warning badge-outline'>{item.category}</span>
                                    <span className='text-info'>{`$${item.price}`}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
            <section className='col-span-4 row-span-2'>

            </section>
            <section className='col-start-2 col-span-10 row-span-2'>

            </section>
        </article>
    )
}

export default Cart