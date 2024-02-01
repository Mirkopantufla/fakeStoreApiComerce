import React from 'react'
import ProductClientButton from './_components/ProductClientButton';
import ClientAddToCart from '@/components/Products/ProductsId/ClientAddToCart';
import { baseURL } from '@/utils/paths';


const fetchProduct = async (id) => {
    const respJson = await fetch(`${baseURL}/products/${id}`);
    const data = await respJson.json();

    return data;
}

const ProductDisplay = async ({ params }) => {

    const data = await fetchProduct(params.productId)

    return (
        <>
            <div className='grid-start-1 col-span-1'>
                <ProductClientButton />
            </div>
            <div className='grid grid-cols-6 grid-rows-3 justify-center items-center min-h-screen min-w-full'>

                <div className='col-start-2 col-span-4 row-span-3 flex flex-col items-center border-2 border-neutral p-10 mb-5'>
                    <h1 className='text-4xl text-center'>{data?.product?.title}</h1>
                    <div className="bg-accent text-neutral rounded-2xl p-2 my-3">{data?.product?.category}</div>
                    <div className='w-[400px] h-[400px] flex justify-center m-5'>
                        <img className='w-auto h-full' src={data.product?.images ? data.product?.images[0].src_imagen : null} alt="" />
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className='text-6xl my-2 bg-neutral p-2 rounded-2xl text-primary'>${data?.product?.price}</p>
                        <label htmlFor="">Clasificación</label>
                        <p className='text-xl'>{data?.product?.rating}</p>
                        <progress className="progress progress-primary w-56" value={(data?.product?.rating * 10) * 2} max="100"></progress>
                    </div>

                    <p className='border-2 p-10 my-4 rounded-xl border-neutral'>
                        {/* <h1 className='text-center text-3xl font-bold mb-2'>Descripción</h1> */}
                        {data?.product?.description}
                    </p>

                    <ClientAddToCart item={data?.product} />
                </div>
            </div></>
    )
}

export default ProductDisplay