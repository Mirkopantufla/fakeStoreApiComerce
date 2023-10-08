import React from 'react'
import ProductClientButton from './_components/ProductClientButton';


const fetchProduct = async (id) => {
    const respJson = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await respJson.json();
    return data;
}

const ProductDisplay = async ({ params }) => {

    const product = await fetchProduct(params.productId)

    return (
        <div className='grid grid-cols-6 grid-rows-3 justify-center items-center min-h-screen min-w-full'>
            <div className='grid-start-1 col-span-1'>
                <ProductClientButton />
            </div>
            <div className='col-start-2 col-span-4 row-span-3 flex flex-col items-center border-2 p-10'>
                <img style={{ width: "400px", height: "400px" }} src={product.image} alt="" />
                {product.id}
                <h1 className='text-4xl'>{product.title}</h1>
                <h1>{product.price}</h1>
                <br />
                <div className='flex flex-col items-center'>
                    <label htmlFor="">Clasificación</label>
                    <p className='text-xl'>{product.rating.rate}</p>
                    <progress className="progress progress-primary w-56" value={(product.rating.rate * 10) * 2} max="100"></progress>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay