import React from 'react'
import Image from 'next/image';
import ProductClientButton from './_components/ProductClientButton';
import { baseURL } from '@/utils/paths';
import NoImage from '../../../public/no-image-available.jpg'
import ClientAddToCart from './_components/ClientAddToCart';


const fetchProduct = async (id) => {
    const respJson = await fetch(`${baseURL}/products/${id}`);
    const data = await respJson.json();

    return data;
}

const ProductDisplay = async ({ params }) => {

    const data = await fetchProduct(params.productId)
    console.log(data.product)

    return (
        <>
            <div className='grid-start-1 col-span-1'>
                <ProductClientButton />
            </div>
            <div className='grid grid-cols-6 grid-rows-3 justify-center items-center min-h-screen min-w-full'>

                <div className='col-start-2 col-span-4 row-span-3 flex flex-col items-center border-2 border-neutral p-10 mb-5'>
                    <h1 className='text-4xl text-center'>{data?.product?.title}</h1>
                    <div className="bg-accent text-neutral rounded-2xl p-2 my-3">{data?.product?.category}</div>
                    <div className='min-w-[300px] max-w-[600px] min-h-[400px] max-h-[800px] flex justify-center items-center m-5'>
                        {
                            data?.product?.images[0] ?
                                <img
                                    className='w-auto h-full'
                                    alt={data?.product?.title}
                                    src={data?.product?.images[0].image_src}
                                />
                                :
                                <Image
                                    className='w-auto h-full'
                                    src={NoImage}
                                    alt="no-image"
                                />
                        }
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