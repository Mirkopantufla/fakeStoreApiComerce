import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5'

const fetchProduct = async (id) => {
    const respJson = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await respJson.json();
    return data;
}

const ProductDisplay = async ({ params }) => {
    console.log(params)

    const product = await fetchProduct(params.productId)

    return (
        <div className='grid grid-cols-6 grid-rows-3 justify-center min-h-screen min-w-full'>
            <div className='grid-start-1 col-span-1'>
                <button className='btn btn-primary m-4'>
                    <IoArrowBackSharp className='text-3xl' />
                </button>
            </div>
            <div className='col-start-2 col-span-4 row-span-3 justify-items-center'>
                {product.id}
                <h1 className='text-4xl'>{product.title}</h1>
                <h1>{product.price}</h1>
            </div>
        </div>
    )
}

export default ProductDisplay